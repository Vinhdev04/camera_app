/**
 * @file CleanIcons.tsx
 * @desc Thư viện Icon hình học tối giản (Clean Vector Glyphs) vẽ thuần bằng React Native
 * Loại bỏ 100% Emoji, mang lại trải nghiệm chuyên nghiệp, tinh tế (Anti-slop)
 * @layer modules/auth/components
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * Icon Mũi tên Quay lại (<)
 */
export const BackIcon: React.FC<IconProps> = ({ size = 18, color = '#0F172A', style }) => {
  const armSize = size * 0.42;
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <View
        style={{
          width: armSize,
          height: armSize,
          borderLeftWidth: 2,
          borderBottomWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginLeft: armSize * 0.3,
        }}
      />
    </View>
  );
};

/**
 * Icon Camera phẳng tối giản
 */
export const CameraIcon: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF', style }) => {
  const bodyW = size * 0.9;
  const bodyH = size * 0.65;
  const lensSize = size * 0.38;

  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      {/* Nắp đỉnh nhỏ của camera */}
      <View
        style={{
          width: bodyW * 0.35,
          height: size * 0.12,
          backgroundColor: color,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          marginBottom: -1,
        }}
      />
      {/* Thân camera */}
      <View
        style={{
          width: bodyW,
          height: bodyH,
          borderRadius: 4,
          borderWidth: 1.8,
          borderColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Ống kính trung tâm */}
        <View
          style={{
            width: lensSize,
            height: lensSize,
            borderRadius: lensSize / 2,
            borderWidth: 1.8,
            borderColor: color,
          }}
        />
      </View>
    </View>
  );
};

/**
 * Icon Mã QR / Scanner
 */
export const QrIcon: React.FC<IconProps> = ({ size = 18, color = '#0F172A', style }) => {
  const box = size * 0.36;
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignContent: 'space-between',
        },
        style,
      ]}
    >
      <View style={{ width: box, height: box, borderWidth: 1.8, borderColor: color, borderRadius: 1 }} />
      <View style={{ width: box, height: box, borderWidth: 1.8, borderColor: color, borderRadius: 1 }} />
      <View style={{ width: box, height: box, borderWidth: 1.8, borderColor: color, borderRadius: 1 }} />
      <View style={{ width: box, height: box, backgroundColor: color, borderRadius: 1 }} />
    </View>
  );
};

/**
 * Icon Người dùng / Tài khoản
 */
export const UserIcon: React.FC<IconProps> = ({ size = 18, color = '#0F172A', style }) => {
  const headSize = size * 0.38;
  const bodyW = size * 0.8;
  const bodyH = size * 0.38;

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <View
        style={{
          width: headSize,
          height: headSize,
          borderRadius: headSize / 2,
          borderWidth: 1.8,
          borderColor: color,
          marginBottom: 1,
        }}
      />
      <View
        style={{
          width: bodyW,
          height: bodyH,
          borderTopLeftRadius: bodyW / 2,
          borderTopRightRadius: bodyW / 2,
          borderWidth: 1.8,
          borderColor: color,
          borderBottomWidth: 0,
        }}
      />
    </View>
  );
};

/**
 * Icon Mắt bật/tắt mật khẩu (Eye Glyph)
 */
export const EyeIcon: React.FC<IconProps & { isOpen?: boolean }> = ({
  size = 18,
  color = '#DC2626',
  isOpen = true,
  style,
}) => {
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <View
        style={{
          width: size * 0.85,
          height: size * 0.52,
          borderRadius: size * 0.5,
          borderWidth: 1.5,
          borderColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: size * 0.22,
            height: size * 0.22,
            borderRadius: size * 0.11,
            backgroundColor: color,
          }}
        />
      </View>
      {!isOpen && (
        <View
          style={{
            position: 'absolute',
            width: size * 0.95,
            height: 1.5,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }],
          }}
        />
      )}
    </View>
  );
};

/**
 * Icon Ổ khóa (Lock)
 */
export const LockIcon: React.FC<IconProps> = ({ size = 20, color = '#DC2626', style }) => {
  const bodyW = size * 0.75;
  const bodyH = size * 0.55;
  const shackleW = size * 0.45;
  const shackleH = size * 0.35;

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <View
        style={{
          width: shackleW,
          height: shackleH,
          borderTopLeftRadius: shackleW / 2,
          borderTopRightRadius: shackleW / 2,
          borderWidth: 1.8,
          borderColor: color,
          borderBottomWidth: 0,
          marginBottom: -1,
        }}
      />
      <View
        style={{
          width: bodyW,
          height: bodyH,
          borderRadius: 3,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

/**
 * Icon Cảnh báo (Alert Warning)
 */
export const AlertIcon: React.FC<IconProps> = ({ size = 18, color = '#EF4444', style }) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1.8,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <View style={{ width: 1.8, height: size * 0.35, backgroundColor: color, marginBottom: 2 }} />
      <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
    </View>
  );
};

/**
 * Icon Tích hợp thành công (Check)
 */
export const CheckIcon: React.FC<IconProps> = ({ size = 18, color = '#10B981', style }) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <View
        style={{
          width: size * 0.4,
          height: size * 0.22,
          borderLeftWidth: 2,
          borderBottomWidth: 2,
          borderColor: '#FFFFFF',
          transform: [{ rotate: '-45deg' }],
          marginTop: -size * 0.08,
        }}
      />
    </View>
  );
};

