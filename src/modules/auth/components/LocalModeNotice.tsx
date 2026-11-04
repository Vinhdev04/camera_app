/**
 * @file LocalModeNotice.tsx
 * @desc Component UI hiển thị thông báo và cam kết trải nghiệm chế độ Cục bộ (LAN-first)
 * @layer modules/auth/components
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';

export interface LocalModeNoticeProps {
  onContinueLocal: () => void;
}

export const LocalModeNotice: React.FC<LocalModeNoticeProps> = ({
  onContinueLocal,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>🛡️</Text>
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

      <Button
        style={styles.continueBtn}
        title="Tiếp Tục Chế Độ Cục Bộ"
        variant="primary"
        onPress={onContinueLocal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: spacing.xl,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.infoSubtle || '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    ...Typography.titleSm,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  highlightBox: {
    width: '100%',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
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
    color: Colors.textPrimary,
    flex: 1,
  },
  continueBtn: {
    width: '100%',
  },
});

export default LocalModeNotice;
