/**
 * @file RegisterForm.styles.ts
 * @desc Styles cho Form Đăng ký tài khoản mới
 * @layer modules/auth/components
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: spacing.md,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    marginTop: -spacing.xs,
  },
  termsTextWrap: {
    flex: 1,
  },
  termsText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  submitBtn: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  switchTabWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  switchTabText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  switchTabLink: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  errorBanner: {
    backgroundColor: Colors.dangerSubtle || 'rgba(239, 68, 68, 0.1)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.borderError,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorBannerText: {
    ...Typography.caption,
    color: Colors.danger,
    lineHeight: 18,
  },
});

export default styles;
