import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { cameraStatusTokens, radius, spacing, typography } from '@/shared/styles/tokens';
import { CameraStatus } from '@/shared/types';

export interface StatusBadgeProps {
  status: CameraStatus;
  style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
  const config = cameraStatusTokens[status] || cameraStatusTokens.offline;

  return (
    <View style={[styles.container, { backgroundColor: config.bgColor }, style]}>
      <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
      <Text style={[styles.text, { color: config.textColor }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    ...typography.badge,
  },
});
