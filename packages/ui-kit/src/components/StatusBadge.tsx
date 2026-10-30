import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../tokens';
import { CameraStatus } from '@uicv/core-contracts';

export interface StatusBadgeProps {
  status: CameraStatus;
  style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: colors.success,
          label: 'Trực tiếp',
          bg: 'rgba(16, 185, 129, 0.15)',
        };
      case 'connecting':
        return {
          color: colors.warning,
          label: 'Đang nối...',
          bg: 'rgba(245, 158, 11, 0.15)',
        };
      case 'error':
        return {
          color: colors.danger,
          label: 'Lỗi',
          bg: 'rgba(239, 68, 68, 0.15)',
        };
      case 'offline':
      default:
        return {
          color: colors.offline,
          label: 'Ngoại tuyến',
          bg: 'rgba(107, 114, 128, 0.15)',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.bg }, style]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
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
