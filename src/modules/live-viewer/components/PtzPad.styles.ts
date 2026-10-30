/**
 * @file PtzPad.styles.ts
 * @desc Styles cho cụm joystick điều khiển PTZ
 * @layer modules/live-viewer/components
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  ptzPanel: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ptzTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
    marginBottom: spacing.md,
    letterSpacing: 0.5,
  },
  ptzGrid: {
    width: 180,
    height: 180,
    justifyContent: 'space-between',
  },
  ptzRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ptzBtn: {
    width: 52,
    height: 52,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  ptzBtnText: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;

