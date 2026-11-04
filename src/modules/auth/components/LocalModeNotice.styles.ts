/**
 * @file LocalModeNotice.styles.ts
 * @desc Styles cho thông báo chế độ Cục bộ (Local-first Mode)
 * @layer modules/auth/components
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: spacing.xl,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.infoSubtle || '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    ...Typography.titleSm,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  highlightBox: {
    width: '100%',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: spacing.md,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  featureText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    flex: 1,
  },
  continueBtn: {
    width: '100%',
  },
});

export default styles;
