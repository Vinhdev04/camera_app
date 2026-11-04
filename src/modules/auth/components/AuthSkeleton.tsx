/**
 * @file AuthSkeleton.tsx
 * @desc Component Skeleton Loading với hiệu ứng Shimmer xung nhịp mượt mà (Anti-jump)
 * Sử dụng khi app đang tải cấu hình hoặc xác thực token ban đầu
 * @layer modules/auth/components
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { radius, spacing } from '@/shared/styles/tokens';

export const AuthSkeleton: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      {/* Skeleton Field 1 */}
      <Animated.View style={[styles.labelSkeleton, { opacity: pulseAnim }]} />
      <Animated.View style={[styles.inputSkeleton, { opacity: pulseAnim }]} />

      {/* Skeleton Field 2 */}
      <Animated.View style={[styles.labelSkeleton, { opacity: pulseAnim }]} />
      <Animated.View style={[styles.inputSkeleton, { opacity: pulseAnim }]} />

      {/* Skeleton Options Row */}
      <View style={styles.rowSkeleton}>
        <Animated.View style={[styles.smallBox, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.linkBox, { opacity: pulseAnim }]} />
      </View>

      {/* Skeleton Action Button */}
      <Animated.View style={[styles.buttonSkeleton, { opacity: pulseAnim }]} />

      {/* Skeleton Biometric Button */}
      <Animated.View style={[styles.subButtonSkeleton, { opacity: pulseAnim }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spacing.md,
  },
  labelSkeleton: {
    width: 80,
    height: 14,
    borderRadius: radius.xs,
    backgroundColor: Colors.palette.slate[200],
    marginBottom: spacing.xs + 2,
  },
  inputSkeleton: {
    width: '100%',
    height: 50,
    borderRadius: radius.md + 2,
    backgroundColor: Colors.palette.slate[100],
    marginBottom: spacing.lg,
  },
  rowSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  smallBox: {
    width: 130,
    height: 18,
    borderRadius: radius.xs,
    backgroundColor: Colors.palette.slate[200],
  },
  linkBox: {
    width: 90,
    height: 18,
    borderRadius: radius.xs,
    backgroundColor: Colors.palette.slate[200],
  },
  buttonSkeleton: {
    width: '100%',
    height: 50,
    borderRadius: radius.md + 4,
    backgroundColor: Colors.palette.red[100],
    marginBottom: spacing.lg,
  },
  subButtonSkeleton: {
    width: '100%',
    height: 48,
    borderRadius: radius.md + 2,
    backgroundColor: Colors.palette.slate[100],
  },
});

export default AuthSkeleton;
