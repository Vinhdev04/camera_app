import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, radius, spacing, typography } from '@/shared/styles/tokens';
import { Button } from './Button';

export interface ModalProps {
  visible: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmTitle?: string;
  confirmVariant?: 'primary' | 'danger';
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmLoading?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  description,
  children,
  confirmTitle = 'Xác nhận',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
  onClose,
  confirmLoading = false,
}) => {
  const handleClose = onClose || onCancel || (() => {});

  return (
    <RNModal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.dialog}>
              <Text style={styles.title}>{title}</Text>
              {Boolean(description) && (
                <Text style={styles.description}>{description}</Text>
              )}
              {children}
              {(onConfirm || onCancel) && (
                <View style={styles.actions}>
                  {onCancel && (
                    <Button
                      style={styles.cancelBtn}
                      title="Hủy"
                      variant="secondary"
                      onPress={onCancel}
                    />
                  )}
                  {onConfirm && (
                    <Button
                      loading={confirmLoading}
                      style={styles.confirmBtn}
                      title={confirmTitle}
                      variant={confirmVariant}
                      onPress={onConfirm}
                    />
                  )}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    ...typography.titleMd,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  cancelBtn: {
    flex: 1,
  },
  confirmBtn: {
    flex: 1,
  },
});
