/**
 * @file DashboardScreen.styles.ts
 * @desc Styles cho màn hình Dashboard theo chuẩn UI Mockup SCR-02 (Light Tech System)
 * @layer modules/camera/screens
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, shadows, spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  appTitle: {
    ...Typography.titleLg,
  },
  subtitle: {
    ...Typography.caption,
    marginTop: 2,
    color: Colors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingsBtn: {
    minHeight: 38,
    paddingHorizontal: spacing.sm,
  },
  gridBtn: {
    minHeight: 38,
    paddingHorizontal: spacing.md,
  },
  addBtn: {
    minHeight: 38,
    paddingHorizontal: spacing.md,
  },
  listContainer: {
    padding: spacing.lg,
  },
  // Khối Quick Nav 3 thẻ (SCR-13, SCR-12, SCR-11)
  quickNavRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  quickNavCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  quickNavIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickNavTitle: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  quickNavSub: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 2,
  },
});

export default styles;
