/**
 * @file LocalModeNotice.tsx
 * @desc Hiển thị thông báo và cam kết trải nghiệm chế độ Cục bộ (LAN-first)
 * Người dùng không cần tạo tài khoản hay đăng nhập vẫn xem được camera trong LAN
 * @layer modules/auth/components
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/shared/components';
import { styles } from './LocalModeNotice.styles';

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

export default LocalModeNotice;
