/**
 * @file AddEditCameraScreen.styles.ts
 * @desc Styles cho màn hình thêm/sửa Camera
 * @layer modules/camera/screens
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.titleMd,
  },
  content: {
    padding: spacing.lg,
  },
  presetSection: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  presetButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  presetBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  presetBtnText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  rowFields: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  protocolSection: {
    marginBottom: spacing.lg,
  },
  protocolOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  protoBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  protoActive: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.primary,
  },
  protoText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  protoActiveText: {
    color: Colors.primary,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  deleteAction: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  deleteText: {
    ...Typography.body,
    color: Colors.danger,
    fontWeight: '600',
  },
  testModalContent: {
    gap: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  stepName: {
    ...Typography.body,
    flex: 1,
  },
  stepStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepStatusText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  resultBox: {
    marginTop: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: Colors.surface,
  },
  resultSuccess: {
    ...Typography.caption,
    color: Colors.success,
  },
  resultFailure: {
    ...Typography.caption,
    color: Colors.danger,
  },
  confirmText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalBtn: {
    flex: 1,
  },
});

export default styles;

