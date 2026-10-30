/**
 * @file MultiViewGrid.styles.ts
 * @desc Styles cho cụm lưới hiển thị MultiViewGrid
 * @layer modules/multi-view/components
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  gridCell: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cellVideo: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 0,
  },
  cellFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
  },
  cellName: {
    ...Typography.bodyBold,
    fontSize: 13,
    flex: 1,
    marginRight: 4,
  },
});

export default styles;

