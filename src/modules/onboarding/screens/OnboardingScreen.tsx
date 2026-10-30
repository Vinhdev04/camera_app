/**
 * @file OnboardingScreen.tsx
 * @desc Màn hình Onboarding hướng dẫn người dùng mới (Smart Screen)
 * @layer modules/onboarding/screens
 */

import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button } from '@/shared/components';
import { useOnboarding } from '../hooks/useOnboarding';
import { OnboardingSlideItem } from '../components/OnboardingSlideItem';
import { styles } from './OnboardingScreen.styles';

export interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  // Toàn bộ logic slide, chỉ số hiện tại, sự kiện next/skip lấy từ hook useOnboarding
  const {
    slides,
    currentSlide,
    currentSlideIndex,
    isLastSlide,
    nextSlide,
    skip,
  } = useOnboarding(onComplete);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Bỏ qua" variant="ghost" onPress={skip} />
      </View>

      <View style={styles.content}>
        <OnboardingSlideItem slide={currentSlide} />
      </View>

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === currentSlideIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <Button
          title={isLastSlide ? 'Bắt Đầu Giám Sát' : 'Tiếp Tục'}
          variant="primary"
          onPress={nextSlide}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

