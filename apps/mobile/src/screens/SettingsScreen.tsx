import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Card, colors, Modal, radius, spacing, typography } from '@uicv/ui-kit';

export interface SettingsScreenProps {
  onBack: () => void;
  onResetAllData: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onResetAllData,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [transport, setTransport] = useState<'tcp' | 'udp' | 'auto'>('tcp');
  const [resetModalVisible, setResetModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="← Quay lại" variant="ghost" onPress={onBack} />
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
                onPress={() => setTheme('dark')}
              >
                <Text style={[styles.segmentText, theme === 'dark' && styles.segmentTextActive]}>
                  Tối (Dark)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentBtn, theme === 'light' && styles.segmentActive]}
                onPress={() => setTheme('light')}
              >
                <Text style={[styles.segmentText, theme === 'light' && styles.segmentTextActive]}>
                  Sáng (Light)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Nhóm Mạng & Truyền phát */}
        <Text style={styles.groupTitle}>MẠNG & KẾT NỐI RTSP</Text>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Giao thức mặc định</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[styles.segmentBtn, transport === 'tcp' && styles.segmentActive]}
                onPress={() => setTransport('tcp')}
              >
                <Text style={[styles.segmentText, transport === 'tcp' && styles.segmentTextActive]}>
                  TCP (Ổn định)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentBtn, transport === 'udp' && styles.segmentActive]}
                onPress={() => setTransport('udp')}
              >
                <Text style={[styles.segmentText, transport === 'udp' && styles.segmentTextActive]}>
                  UDP (Nhanh)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Nhóm Thông tin phần mềm */}
        <Text style={styles.groupTitle}>THÔNG TIN & BẢN QUYỀN</Text>
        <Card style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tên ứng dụng</Text>
            <Text style={styles.infoValue}>Universal IP Camera Viewer (UICV)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phiên bản</Text>
            <Text style={styles.infoValue}>0.1.0 (UI Preview Edition)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Chính sách bảo mật</Text>
            <Text style={styles.infoValue}>Direct LAN-First · Không lưu Cloud</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giấy phép mã nguồn</Text>
            <Text style={styles.infoValue}>MIT & LGPL (LibVLC-compatible)</Text>
          </View>
        </Card>

        {/* Nút Xóa dữ liệu */}
        <Button
          style={styles.resetBtn}
          title="Xóa Toàn bộ Dữ liệu Ứng dụng"
          variant="danger"
          onPress={() => setResetModalVisible(true)}
        />
      </ScrollView>

      {/* Modal xác nhận Reset */}
      <Modal
        confirmTitle="Đặt lại toàn bộ"
        confirmVariant="danger"
        description="Toàn bộ danh sách camera và thông tin xác thực đã lưu trong máy sẽ bị xóa sạch. Ứng dụng sẽ quay trở lại trạng thái ban đầu."
        title="Xác nhận Đặt lại Dữ liệu"
        visible={resetModalVisible}
        onCancel={() => setResetModalVisible(false)}
        onConfirm={() => {
          setResetModalVisible(false);
          onResetAllData();
          Alert.alert('Thành công', 'Đã đặt lại dữ liệu ứng dụng về mặc định.');
        }}
      />
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
  groupTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  card: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.sm,
    padding: 3,
  },
  segmentBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.sm - 2,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.textPrimary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  resetBtn: {
    marginTop: spacing.md,
  },
});
