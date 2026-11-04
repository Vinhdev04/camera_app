/**
 * @file AuthScreen.styles.ts
 * @desc Styles cho Màn hình Xác thực & Tài khoản người dùng (SCR-11)
 * @layer modules/auth/screens
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
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  roadmapBadge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radius.full,
    backgroundColor: Colors.primarySubtle || '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  roadmapBadgeText: {
    ...Typography.badge,
    fontSize: 10,
    color: Colors.primary,
    letterSpacing: 0.8,
  },
  brandWrap: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: Colors.palette.slate[900],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconText: {
    fontSize: 18,
  },
  logoTitle: {
    ...Typography.bodyBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  logoSubtitle: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  pageTitle: {
    ...Typography.titleLg,
    fontSize: 26,
    color: Colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  pageSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  modeSegmentWrap: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  accountCard: {
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: spacing.xl,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primarySubtle || '#FEF2F2',
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  userAvatarText: {
    fontSize: 28,
  },
  userName: {
    ...Typography.titleMd,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: spacing.lg,
  },
  logoutBtn: {
    width: '100%',
  },
});

export default styles;
