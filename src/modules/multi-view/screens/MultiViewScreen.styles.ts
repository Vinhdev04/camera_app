/**
 * @file MultiViewScreen.styles.ts
 * @desc Styles cho màn hình MultiViewScreen
 * @layer modules/multi-view/screens
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
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.titleMd,
  },
  headerRight: {
    paddingHorizontal: spacing.sm,
  },
  substreamBadge: {
    ...Typography.caption,
    color: Colors.primaryLight,
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    fontWeight: '600',
  },
  gridContainer: {
    padding: spacing.md,
  },
  helperBanner: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  helperText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

export default styles;

