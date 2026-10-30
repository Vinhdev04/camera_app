/**
 * @file CameraCard.styles.ts
 * @desc Styles cho component CameraCard
 * @layer modules/camera/components
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  thumbnail: {
    borderTopLeftRadius: radius.lg - 1,
    borderTopRightRadius: radius.lg - 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  titleWrap: {
    flex: 1,
    marginRight: spacing.sm,
  },
  cameraName: {
    ...Typography.bodyBold,
    fontSize: 16,
  },
  cameraSub: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.danger,
    marginTop: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderColor: Colors.surfaceElevated,
  },
  timestamp: {
    ...Typography.caption,
  },
  diagBtn: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  diagText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default styles;

