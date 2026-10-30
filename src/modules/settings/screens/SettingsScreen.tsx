/**
 * @file SettingsScreen.tsx
 * @desc Màn hình Cài đặt ứng dụng (Smart Screen)
 * @layer modules/settings/screens
 */

import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Modal } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { AppConfig } from '@/shared/constants/Config';
import { useSettings } from '../hooks/useSettings';
import { styles } from './SettingsScreen.styles';

export interface SettingsScreenProps {
  onNavigateBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigateBack }) => {
  // Lấy state và hàm cập nhật cài đặt từ hook useSettings
  const { theme, transport, updateTheme, updateTransport, resetAllData } = useSettings();
  const [resetModalVisible, setResetModalVisible] = useState(false);

  const handleConfirmReset = async () => {
    setResetModalVisible(false);
    await resetAllData();
    onNavigateBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="← Quay lại" variant="ghost" onPress={onNavigateBack} />
        <Text style={styles.title}>Cài đặt Ứng dụng</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Nhóm Giao diện */}
        <Text style={styles.groupTitle}>GIAO DIỆN & HIỂN THỊ</Text>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Chế độ giao diện</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[styles.segmentBtn, theme === 'dark' && styles.segmentActive]}
                onPress={() => updateTheme('dark')}
              >
                <Text style={[styles.segmentText, theme === 'dark' && styles.segmentTextActive]}>
                  Tối (Dark)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentBtn, theme === 'light' && styles.segmentActive]}
                onPress={() => updateTheme('light')}
              >
                <Text style={[styles.segmentText, theme === 'light' && styles.segmentTextActive]}>
                  Sáng (Light)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Tỷ lệ khung hình mặc định</Text>
            <Text style={styles.rowValue}>16 : 9 (Widescreen)</Text>
          </View>
        </Card>

        {/* Nhóm Mạng & Giao thức */}
        <Text style={styles.groupTitle}>KẾT NỐI RTSP / ONVIF</Text>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Giao thức ưu tiên</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[styles.segmentBtn, transport === 'tcp' && styles.segmentActive]}
                onPress={() => updateTransport('tcp')}
              >
                <Text style={[styles.segmentText, transport === 'tcp' && styles.segmentTextActive]}>
                  TCP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentBtn, transport === 'udp' && styles.segmentActive]}
                onPress={() => updateTransport('udp')}
              >
                <Text style={[styles.segmentText, transport === 'udp' && styles.segmentTextActive]}>
                  UDP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentBtn, transport === 'auto' && styles.segmentActive]}
                onPress={() => updateTransport('auto')}
              >
                <Text style={[styles.segmentText, transport === 'auto' && styles.segmentTextActive]}>
                  Auto
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Thời gian chờ kết nối (Timeout)</Text>
            <Text style={styles.rowValue}>{AppConfig.connectionTimeoutMs / 1000} giây</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Cổng RTSP mặc định</Text>
            <Text style={styles.rowValue}>{AppConfig.defaultRtspPort}</Text>
          </View>
        </Card>

        {/* Nhóm Dữ liệu & Bảo mật */}
        <Text style={styles.groupTitle}>DỮ LIỆU & QUYỀN RIÊNG TƯ</Text>
        <Card style={styles.card}>
          <TouchableOpacity
            style={styles.dangerRow}
            onPress={() => setResetModalVisible(true)}
          >
            <Text style={styles.dangerText}>Xoá toàn bộ cấu hình Camera</Text>
            <Text style={styles.dangerArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        <Text style={styles.footerText}>
          {AppConfig.appName} · Phiên bản v{AppConfig.appVersion}
          {'\n'}Thiết kế theo triết lý LAN-First Không Phụ Thuộc Cloud
        </Text>
      </ScrollView>

      {/* Modal xác nhận đặt lại dữ liệu */}
      <Modal
        title="Đặt Lại Ứng Dụng"
        visible={resetModalVisible}
        onClose={() => setResetModalVisible(false)}
      >
        <Text style={styles.confirmText}>
          Hành động này sẽ xóa toàn bộ danh sách camera và thông tin xác thực đã lưu trên thiết bị của bạn. Bạn không thể hoàn tác hành động này.
        </Text>
        <View style={styles.modalBtnRow}>
          <Button
            style={styles.modalBtn}
            title="Huỷ"
            variant="secondary"
            onPress={() => setResetModalVisible(false)}
          />
          <Button
            style={[styles.modalBtn, { backgroundColor: Colors.danger }]}
            title="Xoá tất cả"
            variant="primary"
            onPress={handleConfirmReset}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;

