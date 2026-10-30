/**
 * @file DiagnosticsScreen.styles.ts
 * @desc Styles cho màn hình DiagnosticsScreen
 * @layer modules/diagnostics/screens
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
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statusIcon: {
    fontSize: 28,
  },
  statusTextWrap: {
    flex: 1,
  },
  statusTitle: {
    ...Typography.bodyBold,
    fontSize: 15,
  },
  statusSubtitle: {
    ...Typography.caption,
    marginTop: 2,
  },
  noticeBox: {
    backgroundColor: Colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noticeTitle: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.warning,
    marginBottom: 4,
  },
  noticeDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  copyBtn: {
    marginBottom: spacing.xl,
  },
});

export default styles;

