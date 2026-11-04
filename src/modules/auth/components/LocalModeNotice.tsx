/**
 * @file LocalModeNotice.tsx
 * @desc Component UI hiển thị thông báo và cam kết trải nghiệm chế độ Cục bộ (LAN-first)
 * Clean UI, không emoji
 * @layer modules/auth/components
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';
import { CameraIcon } from './CleanIcons';

export interface LocalModeNoticeProps {
  onContinueLocal: () => void;
}

export const LocalModeNotice: React.FC<LocalModeNoticeProps> = ({
  onContinueLocal,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <CameraIcon color={Colors.primary} size={28} />
      </View>

      <Text style={styles.title}>Chế Độ Cục Bộ (LAN-First)</Text>
      <Text style={styles.description}>
        Bạn hoàn toàn có thể giám sát camera trong mạng nội bộ mà không cần đăng ký
        tài khoản hay phụ thuộc vào đám mây của nhà sản xuất.
      </Text>

      <View style={styles.highlightBox}>
        <View style={styles.featureItem}>
          <View style={styles.featureBullet} />
          <Text style={styles.featureText}>
            Dữ liệu video RTSP đi thẳng từ camera tới điện thoại qua Wi-Fi LAN
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureBullet} />
          <Text style={styles.featureText}>
            Mật khẩu và địa chỉ IP được lưu trữ an toàn trong thiết bị của bạn
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureBullet} />
          <Text style={styles.featureText}>
            Không thu thập dữ liệu cá nhân, không quảng cáo làm phiền
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.continueBtn}
        onPress={onContinueLocal}
      >
        <Text style={styles.continueBtnText}>Tiếp Tục Chế Độ Cục Bộ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: Colors.palette.slate[200],
    padding: spacing.xl,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.palette.red[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...Typography.titleSm,
    fontSize: 18,
    color: Colors.palette.slate[900],
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.palette.slate[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  highlightBox: {
    width: '100%',
    backgroundColor: Colors.palette.slate[50],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.palette.slate[200],
    padding: spacing.md,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  featureText: {
    ...Typography.caption,
    fontSize: 12,
    color: Colors.palette.slate[800],
    flex: 1,
    lineHeight: 18,
  },
  continueBtn: {
    width: '100%',
    minHeight: 50,
    backgroundColor: Colors.primary,
    borderRadius: radius.md + 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});

export default LocalModeNotice;
