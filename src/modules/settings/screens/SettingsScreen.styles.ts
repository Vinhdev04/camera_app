/**
 * @file SettingsScreen.styles.ts
 * @desc Styles cho màn hình SettingsScreen
 * @layer modules/settings/screens
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
  groupTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    letterSpacing: 0.5,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  rowLabel: {
    ...Typography.body,
  },
  rowValue: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: radius.sm,
    padding: 2,
  },
  segmentBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm - 2,
  },
  segmentActive: {
    backgroundColor: Colors.primary,
  },
  segmentText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dangerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  dangerText: {
    ...Typography.body,
    color: Colors.danger,
    fontWeight: '600',
  },
  dangerArrow: {
    color: Colors.danger,
    fontSize: 18,
  },
  footerText: {
    ...Typography.caption,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
    lineHeight: 18,
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

