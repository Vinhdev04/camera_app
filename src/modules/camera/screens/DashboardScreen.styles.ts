/**
 * @file DashboardScreen.styles.ts
 * @desc Styles cho màn hình Dashboard
 * @layer modules/camera/screens
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { spacing } from '@/shared/styles/tokens';

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
  },
  appTitle: {
    ...Typography.titleLg,
  },
  subtitle: {
    ...Typography.caption,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
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
});

export default styles;

