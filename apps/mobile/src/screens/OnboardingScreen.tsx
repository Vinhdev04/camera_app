import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Button, colors, radius, spacing, typography } from '@uicv/ui-kit';

const SLIDES = [
  {
    icon: '🛡️',
    title: 'Giám sát LAN-First An toàn',
    description:
      'Kết nối trực tiếp tới Camera IP trong mạng Wi-Fi gia đình. Dữ liệu video không đi qua bất kỳ máy chủ đám mây nào, bảo vệ 100% sự riêng tư.',
  },
  {
    icon: '⚖️',
    title: 'Cam kết Pháp lý & Sở hữu',
    description:
      'Theo quy chuẩn an ninh, bạn chỉ được phép kết nối và giám sát các thiết bị camera thuộc quyền sở hữu hợp pháp hoặc được ủy quyền quản trị.',
  },
  {
    icon: '📡',
    title: 'Khám phá Mạng Cục bộ',
    description:
      'Ứng dụng cần quyền Local Network để tự động quét cổng RTSP và nhận dạng camera trong cùng dải mạng nội bộ.',
  },
];

export interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Bỏ qua"
          variant="ghost"
          onPress={onComplete}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>{slide.icon}</Text>
        </View>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        {/* Thanh chỉ báo số slide */}
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          style={styles.nextBtn}
          title={currentSlide === SLIDES.length - 1 ? 'Bắt đầu sử dụng' : 'Tiếp theo'}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconText: {
    fontSize: 38,
  },
  title: {
    ...typography.titleLg,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  pagination: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.surfaceElevated,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  nextBtn: {
    width: '100%',
  },
});
