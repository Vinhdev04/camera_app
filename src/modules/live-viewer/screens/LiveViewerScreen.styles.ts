/**
 * @file LiveViewerScreen.styles.ts
 * @desc Styles cho màn hình LiveViewerScreen
 * @layer modules/live-viewer/screens
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
  titleWrap: {
    alignItems: 'center',
  },
  cameraName: {
    ...Typography.bodyBold,
    fontSize: 16,
  },
  cameraIp: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  alertBanner: {
    backgroundColor: Colors.surfaceElevated,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.primary,
  },
  alertText: {
    ...Typography.caption,
    color: Colors.primaryLight,
  },
  videoArea: {
    width: '100%',
    backgroundColor: '#000000',
  },
  videoPlayer: {
    aspectRatio: 16 / 9,
    borderRadius: 0,
  },
  streamControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  streamQualityBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: radius.sm,
    padding: 2,
  },
  qualityToggleBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm - 2,
  },
  qualityToggleActive: {
    backgroundColor: Colors.primary,
  },
  qualityToggleText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  qualityToggleTextActive: {
    color: '#FFFFFF',
  },
  stateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stateText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  actionsToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: Colors.background,
  },
  toolBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  toolIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  toolLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
});

export default styles;

