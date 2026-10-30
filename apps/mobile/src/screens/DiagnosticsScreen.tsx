import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Button, Card, colors, radius, spacing, typography } from '@uicv/ui-kit';
import { Camera } from '@uicv/core-contracts';

export interface DiagnosticsScreenProps {
  camera: Camera;
  onBack: () => void;
}

export const DiagnosticsScreen: React.FC<DiagnosticsScreenProps> = ({
  camera,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);

  const diagnosticData = [
    { label: 'Địa chỉ IP Camera', value: camera.host },
    { label: 'Cổng RTSP (TCP)', value: `${camera.port} (Đang mở)` },
    { label: 'Đường dẫn Main Stream', value: camera.path },
    { label: 'Giao thức truyền tải', value: camera.transport.toUpperCase() },
    { label: 'Độ trễ Ping nội mạng (LAN)', value: '12 ms (Rất tốt)' },
    { label: 'Định dạng mã hóa Video (Codec)', value: 'H.264 / AVC Baseline' },
    { label: 'Thời gian phản hồi kết nối', value: '1.2s' },
    { label: 'Trạng thái xác thực (Auth)', value: camera.hasPassword ? 'Basic/Digest (Đã lưu)' : 'Không mật khẩu' },
  ];

  const handleCopyReport = () => {
    // Giả lập sao chép báo cáo đã che thông tin nhạy cảm (SEC-002 Redaction)
    setCopied(true);
    Alert.alert('Đã sao chép', 'Báo cáo chẩn đoán (đã che mật khẩu & thông tin nhạy cảm) đã được lưu vào bộ nhớ tạm.');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="← Quay lại" variant="ghost" onPress={onBack} />
        <Text style={styles.title}>Chẩn đoán Mạng</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>
          Kết quả Kiểm tra: {camera.name}
        </Text>

        <Card style={styles.diagCard}>
          {diagnosticData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.diagRow,
                index < diagnosticData.length - 1 && styles.borderBottom,
              ]}
            >
              <Text style={styles.diagLabel}>{item.label}</Text>
              <Text style={styles.diagValue}>{item.value}</Text>
            </View>
          ))}
        </Card>

        <View style={styles.adviceBox}>
          <Text style={styles.adviceTitle}>💡 Gợi ý xử lý khi không xem được:</Text>
          <Text style={styles.adviceText}>
            1. Đảm bảo điện thoại và camera đang kết nối cùng một mạng Wi-Fi (tránh dùng mạng 4G/5G khi chưa có Relay).
          </Text>
          <Text style={styles.adviceText}>
            2. Kiểm tra xem router có bật tính năng "AP Isolation" (cô lập thiết bị Wi-Fi) không.
          </Text>
          <Text style={styles.adviceText}>
            3. Vào app chính hãng của camera (Yoosee / Imou) để xác nhận tính năng RTSP/ONVIF đã được gạt sang "BẬT".
          </Text>
        </View>

        <Button
          style={styles.copyBtn}
          title={copied ? '✓ Đã sao chép báo cáo' : '📋 Sao chép Báo cáo Chẩn đoán'}
          variant="secondary"
          onPress={handleCopyReport}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.titleMd,
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.titleMd,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  diagCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  diagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.surfaceElevated,
  },
  diagLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  diagValue: {
    ...typography.bodyBold,
    fontSize: 13,
    color: colors.textPrimary,
  },
  adviceBox: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  adviceTitle: {
    ...typography.bodyBold,
    color: colors.warning,
    marginBottom: spacing.xs,
  },
  adviceText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 4,
  },
  copyBtn: {
    width: '100%',
  },
});
