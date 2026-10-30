/**
 * @file useOnboarding.ts
 * @desc Hook quản lý tiến trình Onboarding
 * @layer modules/onboarding/hooks
 */

import { useState, useMemo, useCallback } from 'react';
import * as onboardingService from '../services/onboarding.service';

export const useOnboarding = (onComplete?: () => void) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = useMemo(() => {
    return onboardingService.fetchOnboardingSlidesApi();
  }, []);

  const currentSlide = slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === slides.length - 1;

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  }, [currentSlideIndex, slides.length, onComplete]);

  const skip = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  return {
    slides,
    currentSlide,
    currentSlideIndex,
    isLastSlide,
    nextSlide,
    skip,
  };
};

export default useOnboarding;

