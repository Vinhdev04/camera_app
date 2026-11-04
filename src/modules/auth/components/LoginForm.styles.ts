/**
 * @file LoginForm.styles.ts
 * @desc Styles cho Form Đăng nhập theo chuẩn UI Mockup SCR-11
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: -spacing.xs,
  },
  rememberWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rememberLabel: {
    ...Typography.caption,
    color: Colors.textPrimary,
  },
  forgotBtn: {
    paddingVertical: spacing.xs,
  },
  forgotText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  submitBtn: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  orText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1.5,
    paddingHorizontal: spacing.md,
  },
  biometricBtn: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.md,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  biometricText: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  biometricIcon: {
    fontSize: 18,
  },
  footerNoteWrap: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  footerNote: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  switchTabWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
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
