/**
 * @file OnboardingSlideItem.styles.ts
 * @desc Styles cho OnboardingSlideItem
 * @layer modules/onboarding/components
 */

import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { spacing } from '@/shared/styles/tokens';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  slideWrapper: {
    width: width - spacing.xl * 2,
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  slideIcon: {
    fontSize: 48,
  },
  slideTitle: {
    ...Typography.titleLg,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  slideDesc: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default styles;

