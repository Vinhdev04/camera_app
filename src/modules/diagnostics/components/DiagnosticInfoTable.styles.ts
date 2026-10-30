/**
 * @file DiagnosticInfoTable.styles.ts
 * @desc Styles cho DiagnosticInfoTable
 * @layer modules/diagnostics/components
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  dataCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  diagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  diagLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    flex: 1,
  },
  diagValue: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});

export default styles;

