/**
 * @file OnboardingSlideItem.tsx
 * @desc Dumb UI component hiển thị 1 slide giới thiệu
 * @layer modules/onboarding/components
 */

import React from 'react';
import { View, Text } from 'react-native';
import { OnboardingSlide } from '../types';
import { styles } from './OnboardingSlideItem.styles';

export interface OnboardingSlideItemProps {
  slide: OnboardingSlide;
}

export const OnboardingSlideItem: React.FC<OnboardingSlideItemProps> = ({ slide }) => {
  return (
    <View style={styles.slideWrapper}>
      <View style={styles.iconBox}>
        <Text style={styles.slideIcon}>{slide.icon}</Text>
      </View>
      <Text style={styles.slideTitle}>{slide.title}</Text>
      <Text style={styles.slideDesc}>{slide.description}</Text>
    </View>
  );
};

export default OnboardingSlideItem;

