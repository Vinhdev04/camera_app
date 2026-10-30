/**
 * @file OnboardingScreen.styles.ts
 * @desc Styles cho OnboardingScreen
 * @layer modules/onboarding/screens
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { spacing } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceElevated,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
});

export default styles;

