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
import {
  Button,
  colors,
  Input,
  Modal,
  radius,
  spacing,
  typography,
} from '@uicv/ui-kit';
import { Camera, CameraInput, StepResult } from '@uicv/core-contracts';
import { FakeConnectionTest } from '@uicv/adapter-mock-data';

export interface AddEditCameraScreenProps {
  initialCamera?: Camera;
  onSave: (input: CameraInput) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

export const AddEditCameraScreen: React.FC<AddEditCameraScreenProps> = ({
  initialCamera,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [name, setName] = useState(initialCamera?.name || '');
  const [host, setHost] = useState(initialCamera?.host || '');
  const [port, setPort] = useState(initialCamera ? String(initialCamera.port) : '554');
  const [path, setPath] = useState(initialCamera?.path || '/onvif1');
  const [substreamPath, setSubstreamPath] = useState(initialCamera?.substreamPath || '');
  const [username, setUsername] = useState(initialCamera?.username || 'admin');
  const [password, setPassword] = useState('');
  const [transport, setTransport] = useState<'tcp' | 'udp' | 'auto'>(
    initialCamera?.transport || 'tcp'
  );

  // Trạng thái modal kiểm tra kết nối (SCR-05)
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [testSteps, setTestSteps] = useState<StepResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [testResultMsg, setTestResultMsg] = useState<string | null>(null);

  // Modal xác nhận xóa camera
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Gợi ý Preset theo hãng (BR-U05)
  const applyPreset = (preset: 'yoosee' | 'imou' | 'generic') => {
    if (preset === 'yoosee') {
      setPort('554');
      setPath('/onvif1');
      setSubstreamPath('/onvif2');
    } else if (preset === 'imou') {
      setPort('554');
      setPath('/cam/realmonitor?channel=1&subtype=0');
      setSubstreamPath('/cam/realmonitor?channel=1&subtype=1');
    } else {
      setPort('554');
      setPath('/live/ch0');
      setSubstreamPath('/live/ch1');
    }
  };

  const handleRunTest = async () => {
    if (!host) {
      Alert.alert('Lỗi', 'Vui lòng nhập Địa chỉ IP / Host');
      return;
    }

    setTestModalVisible(true);
    setTesting(true);
    setTestSteps([]);
    setTestResultMsg(null);

    const tester = new FakeConnectionTest();
    const result = await tester.testConnection(
      {
        name: name || 'Test Camera',
        host,
        port: parseInt(port, 10) || 554,
        path,
        substreamPath,
        username,
        password,
        transport,
      },
      (stepUpdate) => {
        setTestSteps((prev) => {
          const filtered = prev.filter((s) => s.step !== stepUpdate.step);
          return [...filtered, stepUpdate];
        });
      }
    );

    setTesting(false);
    if (result.isSuccess) {
      setTestResultMsg(`Kết nối thành công! Codec nhận dạng: ${result.detectedCodec}`);
    } else {
      setTestResultMsg(`Thất bại: ${result.error}`);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Tên camera không được để trống');
      return;
    }
    if (!host.trim()) {
      Alert.alert('Lỗi', 'Địa chỉ IP không được để trống');
      return;
    }

    onSave({
      name: name.trim(),
      host: host.trim(),
      port: parseInt(port, 10) || 554,
      path: path.trim(),
      substreamPath: substreamPath.trim() || undefined,
      username: username.trim() || undefined,
      password: password || undefined,
      transport,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Button title="Hủy" variant="ghost" onPress={onCancel} />
        <Text style={styles.title}>
          {initialCamera ? 'Sửa Camera' : 'Thêm Camera'}
        </Text>
        <Button title="Lưu" variant="primary" onPress={handleSave} />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Nút Preset gợi ý nhanh */}
        <View style={styles.presetSection}>
          <Text style={styles.sectionTitle}>Preset Gợi ý Đường dẫn:</Text>
          <View style={styles.presetButtons}>
            <TouchableOpacity
              style={styles.presetBtn}
              onPress={() => applyPreset('yoosee')}
            >
              <Text style={styles.presetText}>Yoosee</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.presetBtn}
              onPress={() => applyPreset('imou')}
            >
              <Text style={styles.presetText}>Imou</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.presetBtn}
              onPress={() => applyPreset('generic')}
            >
              <Text style={styles.presetText}>Generic ONVIF</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.presetNote}>
            * Lưu ý: Tùy thuộc phiên bản firmware của hãng sản xuất.
          </Text>
        </View>

        {/* Các trường nhập liệu */}
        <Input
          label="Tên Camera *"
          placeholder="Ví dụ: Phòng khách, Sân thượng"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.row}>
          <View style={styles.flex2}>
            <Input
              label="Địa chỉ IP / Hostname *"
              placeholder="192.168.1.xxx"
              value={host}
              onChangeText={setHost}
            />
          </View>
          <View style={styles.flex1}>
            <Input
              keyboardType="number-pad"
              label="Cổng RTSP *"
              placeholder="554"
              value={port}
              onChangeText={setPort}
            />
          </View>
        </View>

        <Input
          helperText="Đường dẫn luồng chính HD (bắt đầu bằng /)"
          label="Main Stream Path *"
          placeholder="/onvif1"
          value={path}
          onChangeText={setPath}
        />

        <Input
          helperText="Đường dẫn luồng phụ SD dùng cho chế độ xem lưới Multi-view"
          label="Sub Stream Path"
          placeholder="/onvif2"
          value={substreamPath}
          onChangeText={setSubstreamPath}
        />

        <View style={styles.row}>
          <View style={styles.flex1}>
            <Input
              label="Tài khoản"
              placeholder="admin"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.flex1}>
            <Input
              isPassword
              label="Mật khẩu Camera"
              placeholder={initialCamera?.hasPassword ? '••••••••' : 'Nhập mật khẩu'}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* Nút Kiểm tra kết nối */}
        <Button
          style={styles.testBtn}
          title="⚡ Kiểm tra Kết nối Ngay (Test Connection)"
          variant="secondary"
          onPress={handleRunTest}
        />

        {/* Nút Xóa camera (nếu đang ở chế độ sửa) */}
        {initialCamera && onDelete && (
          <Button
            style={styles.deleteBtn}
            title="Xóa Camera này khỏi Thiết bị"
            variant="danger"
            onPress={() => setDeleteModalVisible(true)}
          />
        )}
      </ScrollView>

      {/* Modal SCR-05: Tiến trình kiểm tra kết nối */}
      <Modal
        title="Kiểm tra Kết nối RTSP"
        visible={testModalVisible}
        onCancel={() => setTestModalVisible(false)}
      >
        <View style={styles.modalStepList}>
          {['dns', 'tcp', 'options', 'describe', 'auth'].map((st) => {
            const current = testSteps.find((s) => s.step === st);
            const status = current?.status || 'pending';
            const labelMap: Record<string, string> = {
              dns: 'Phân giải DNS / Địa chỉ IP',
              tcp: `Kết nối TCP cổng ${port || 554}`,
              options: 'Giao thức RTSP OPTIONS',
              describe: 'Lấy mô tả luồng RTSP DESCRIBE',
              auth: 'Xác thực tài khoản (Auth)',
            };

            return (
              <View key={st} style={styles.stepRow}>
                <Text style={styles.stepIcon}>
                  {status === 'success'
                    ? '✅'
                    : status === 'failed'
                    ? '❌'
                    : status === 'running'
                    ? '⏳'
                    : '⚪'}
                </Text>
                <Text style={styles.stepText}>{labelMap[st]}</Text>
              </View>
            );
          })}
        </View>

        {testResultMsg && (
          <Text
            style={[
              styles.resultText,
              testResultMsg.startsWith('Kết nối')
                ? styles.resultSuccess
                : styles.resultFail,
            ]}
          >
            {testResultMsg}
          </Text>
        )}
      </Modal>

      {/* Modal Xác nhận Xóa Camera */}
      {initialCamera && onDelete && (
        <Modal
          confirmTitle="Xóa vĩnh viễn"
          confirmVariant="danger"
          description="Hành động này sẽ xóa camera cùng toàn bộ mật khẩu đã lưu trong Keystore/Keychain. Bạn có chắc chắn muốn xóa không?"
          title="Xác nhận Xóa Camera"
          visible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={() => {
            setDeleteModalVisible(false);
            onDelete(initialCamera.id);
          }}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.titleMd,
  },
  formContainer: {
    padding: spacing.lg,
  },
  presetSection: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  presetButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  presetBtn: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  presetText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  presetNote: {
    ...typography.caption,
    fontSize: 10,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  testBtn: {
    marginTop: spacing.sm,
  },
  deleteBtn: {
    marginTop: spacing.xl,
  },
  modalStepList: {
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepIcon: {
    fontSize: 16,
  },
  stepText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  resultText: {
    ...typography.bodyBold,
    marginTop: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.sm,
    textAlign: 'center',
  },
  resultSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    color: colors.success,
  },
  resultFail: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: colors.danger,
  },
});
