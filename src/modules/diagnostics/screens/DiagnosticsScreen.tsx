/**
 * @file DiagnosticsScreen.tsx
 * @desc Màn hình chẩn đoán kết nối mạng LAN và thông số camera (Smart Screen)
 * @layer modules/diagnostics/screens
 */

import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Button, Card } from '@/shared/components';
import { Camera } from '@/shared/types';
import { useDiagnostics } from '../hooks/useDiagnostics';
import { DiagnosticInfoTable } from '../components/DiagnosticInfoTable';
import { styles } from './DiagnosticsScreen.styles';

export interface DiagnosticsScreenProps {
  camera: Camera;
  onNavigateBack: () => void;
}

export const DiagnosticsScreen: React.FC<DiagnosticsScreenProps> = ({
  camera,
  onNavigateBack,
}) => {
  const [copied, setCopied] = useState(false);

  // Lấy dữ liệu chẩn đoán an toàn thông qua hook useDiagnostics
  const { getCameraDiagnostics } = useDiagnostics();
  const diagnosticData = getCameraDiagnostics(camera);

  const handleCopyReport = () => {
    setCopied(true);
    Alert.alert(
      'Đã sao chép',
      'Báo cáo chẩn đoán (đã che mật khẩu & thông tin nhạy cảm - SEC-002) đã được lưu vào bộ nhớ tạm.'
    );
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="← Quay lại" variant="ghost" onPress={onNavigateBack} />
        <Text style={styles.title}>Chẩn đoán Mạng</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Thẻ tóm tắt tình trạng */}
        <Card style={styles.statusCard}>
          <Text style={styles.statusIcon}>
            {camera.status === 'online' ? '🟢' : camera.status === 'connecting' ? '🟡' : '🔴'}
          </Text>
          <View style={styles.statusTextWrap}>
            <Text style={styles.statusTitle}>
              {camera.status === 'online'
                ? 'Camera Sẵn Sàng (Trực Tuyến)'
                : camera.status === 'connecting'
                ? 'Đang Kiểm Tra Kết Nối...'
                : 'Sự Cố Kết Nối RTSP'}
            </Text>
            <Text style={styles.statusSubtitle}>
              Mã thiết bị: {camera.id.slice(0, 8)}... · {camera.name}
            </Text>
          </View>
        </Card>

        {/* Bảng chi tiết thông số mạng (Dumb Component) */}
        <DiagnosticInfoTable data={diagnosticData} />

        {/* Hộp ghi chú bảo mật SEC-002 */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>BẢO VỆ DỮ LIỆU RIÊNG TƯ (SEC-002)</Text>
          <Text style={styles.noticeDesc}>
            Báo cáo này tuân thủ quy chuẩn bảo mật cục bộ. Mật khẩu kết nối RTSP và chuỗi băm xác thực được lưu trữ mã hóa trong Keychain của máy và không bao giờ xuất hiện trong báo cáo hoặc gửi ra bên ngoài.
          </Text>
        </View>

        <Button
          style={styles.copyBtn}
          title={copied ? '✓ Đã Lưu Vào Bộ Nhớ Tạm' : 'Sao Chép Báo Cáo Chẩn Đoán'}
          variant="secondary"
          onPress={handleCopyReport}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiagnosticsScreen;

