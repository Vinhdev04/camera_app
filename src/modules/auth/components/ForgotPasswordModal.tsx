/**
 * @file ForgotPasswordModal.tsx
 * @desc Modal yêu cầu đặt lại mật khẩu tài khoản
 * @layer modules/auth/components
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Input } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { spacing } from '@/shared/styles/tokens';
import { AuthService } from '../services/auth.service';

export interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await AuthService.requestPasswordReset(email);
      setIsSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gửi yêu cầu thất bại';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      confirmLoading={loading}
      confirmTitle={isSuccess ? 'Đã hiểu' : 'Gửi Yêu Cầu'}
      description={
        isSuccess
          ? `Liên kết đặt lại mật khẩu đã được gửi tới ${email}. Vui lòng kiểm tra hộp thư.`
          : 'Nhập địa chỉ email đăng ký của bạn để nhận liên kết khôi phục mật khẩu.'
      }
      title="Khôi Phục Mật Khẩu"
      visible={visible}
      onCancel={handleClose}
      onClose={handleClose}
      onConfirm={isSuccess ? handleClose : handleSubmit}
    >
      {!isSuccess && (
        <View style={styles.content}>
          <Input
            autoCapitalize="none"
            error={error || undefined}
            keyboardType="email-address"
            label="Email đăng ký *"
            placeholder="an.nguyen@vidu.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError(null);
            }}
          />
          <Text style={styles.hint}>
            Hệ thống sẽ gửi mã bảo mật dùng một lần có hiệu lực trong vòng 15 phút.
          </Text>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: spacing.sm,
  },
  hint: {
    ...Typography.caption,
    color: Colors.textMuted,
    lineHeight: 16,
    marginTop: -spacing.xs,
    marginBottom: spacing.sm,
  },
});

export default ForgotPasswordModal;

