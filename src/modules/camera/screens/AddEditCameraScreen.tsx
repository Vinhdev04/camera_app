/**
 * @file AddEditCameraScreen.tsx
 * @desc Màn hình Thêm mới và Chỉnh sửa thông số Camera IP (Smart Screen)
 * @layer modules/camera/screens
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Camera } from '@/shared/types';
import { Button, Input, Modal } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { AppConfig } from '@/shared/constants/Config';
import { useCameras } from '../hooks/useCameras';
import { useDiagnostics } from '@/modules/diagnostics/hooks/useDiagnostics';
import { styles } from './AddEditCameraScreen.styles';

export interface AddEditCameraScreenProps {
  initialCamera?: Camera | null;
  onNavigateBack: () => void;
}

export const AddEditCameraScreen: React.FC<AddEditCameraScreenProps> = ({
  initialCamera,
  onNavigateBack,
}) => {
  const { saveCamera, deleteCamera } = useCameras();
  const { testing, steps, testConnection, resetTest } = useDiagnostics();

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

  const [testModalVisible, setTestModalVisible] = useState(false);
  const [testResultMsg, setTestResultMsg] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const applyPreset = (preset: 'yoosee' | 'imou' | 'generic') => {
    const config = AppConfig.cameraPresets[preset];
    if (config) {
      setPort(String(config.port));
      setPath(config.mainPath);
      setSubstreamPath(config.subPath);
    }
  };

  const handleRunTest = async () => {
    if (!host) {
      Alert.alert('Lỗi', 'Vui lòng nhập Địa chỉ IP / Host');
      return;
    }

    setTestModalVisible(true);
    setTestResultMsg(null);

    const result = await testConnection({
      name: name || 'Test Camera',
      host,
      port: parseInt(port, 10) || 554,
      path,
      substreamPath,
      username,
      password,
      transport,
    });

    if (result.isSuccess) {
      setTestResultMsg(
        `Kết nối thành công! Codec: ${result.detectedCodec || 'H.264'} (1080p)`
      );
    } else {
      setTestResultMsg(`Kiểm tra thất bại: ${result.error || 'Không thể kết nối'}`);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng đặt tên cho Camera');
      return;
    }
    if (!host.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập Địa chỉ IP');
      return;
    }

    await saveCamera(
      {
        name: name.trim(),
        host: host.trim(),
        port: parseInt(port, 10) || 554,
        path: path.trim() || '/onvif1',
        substreamPath: substreamPath.trim() || undefined,
        username: username.trim() || undefined,
        password: password ? password : initialCamera?.hasPassword ? 'preserved' : undefined,
        transport,
        manufacturer: 'Generic ONVIF',
      },
      initialCamera?.id
    );

    onNavigateBack();
  };

  const handleDelete = async () => {
    if (initialCamera) {
      setDeleteModalVisible(false);
      await deleteCamera(initialCamera.id);
      onNavigateBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Huỷ" variant="ghost" onPress={onNavigateBack} />
        <Text style={styles.title}>
          {initialCamera ? 'Sửa Camera' : 'Thêm Camera IP'}
        </Text>
        <Button title="Lưu" variant="primary" onPress={handleSave} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.presetSection}>
          <Text style={styles.sectionTitle}>MẪU CẤU HÌNH NHANH (PRESET)</Text>
          <View style={styles.presetButtons}>
            <TouchableOpacity style={styles.presetBtn} onPress={() => applyPreset('yoosee')}>
              <Text style={styles.presetBtnText}>Yoosee</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.presetBtn} onPress={() => applyPreset('imou')}>
              <Text style={styles.presetBtnText}>Imou / Dahua</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.presetBtn} onPress={() => applyPreset('generic')}>
              <Text style={styles.presetBtnText}>RTSP Chung</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Input
          label="Tên hiển thị Camera *"
          placeholder="Ví dụ: Camera Phòng Khách"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.rowFields}>
          <View style={{ flex: 3 }}>
            <Input
              autoCapitalize="none"
              keyboardType="numeric"
              label="Địa chỉ IP (LAN) *"
              placeholder="192.168.1.100"
              value={host}
              onChangeText={setHost}
            />
          </View>
          <View style={{ flex: 1.5 }}>
            <Input
              keyboardType="numeric"
              label="Cổng RTSP"
              placeholder="554"
              value={port}
              onChangeText={setPort}
            />
          </View>
        </View>

        <Input
          autoCapitalize="none"
          label="Đường dẫn Luồng Chính (Main stream)"
          placeholder="/onvif1 hoặc /live/ch0"
          value={path}
          onChangeText={setPath}
        />

        <Input
          autoCapitalize="none"
          label="Đường dẫn Luồng Phụ (Sub-stream)"
          placeholder="/onvif2 hoặc /cam/realmonitor?..."
          value={substreamPath}
          onChangeText={setSubstreamPath}
        />

        <View style={styles.rowFields}>
          <View style={{ flex: 1 }}>
            <Input
              autoCapitalize="none"
              label="Tài khoản RTSP"
              placeholder="admin"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              secureTextEntry
              label="Mật khẩu"
              placeholder={initialCamera?.hasPassword ? '•••••••• (Không đổi)' : 'Mật khẩu RTSP'}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={styles.protocolSection}>
          <Text style={styles.sectionTitle}>GIAO THỨC TRUYỀN TẢI</Text>
          <View style={styles.protocolOptions}>
            {(['tcp', 'udp', 'auto'] as const).map((proto) => (
              <TouchableOpacity
                key={proto}
                style={[styles.protoBtn, transport === proto && styles.protoActive]}
                onPress={() => setTransport(proto)}
              >
                <Text style={[styles.protoText, transport === proto && styles.protoActiveText]}>
                  {proto.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Kiểm Tra Kết Nối (Test Connection)"
            variant="secondary"
            onPress={handleRunTest}
          />

          {Boolean(initialCamera) && (
            <TouchableOpacity
              style={styles.deleteAction}
              onPress={() => setDeleteModalVisible(true)}
            >
              <Text style={styles.deleteText}>Xoá Camera Này</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Modal Kiểm tra kết nối */}
      <Modal
        title="Kiểm Tra Kết Nối Camera"
        visible={testModalVisible}
        onClose={() => {
          setTestModalVisible(false);
          resetTest();
        }}
      >
        <View style={styles.testModalContent}>
          {steps.map((s, idx) => (
            <View key={idx} style={styles.stepRow}>
              <Text style={styles.stepName}>
                {s.step === 'dns'
                  ? '1. Phân giải DNS / Kiểm tra Host'
                  : s.step === 'tcp'
                  ? '2. Kiểm tra cổng TCP 554'
                  : s.step === 'options'
                  ? '3. Gửi lệnh RTSP OPTIONS'
                  : s.step === 'describe'
                  ? '4. Gửi lệnh RTSP DESCRIBE'
                  : '5. Xác thực tài khoản RTSP'}
              </Text>
              <View style={styles.stepStatusBadge}>
                <Text
                  style={[
                    styles.stepStatusText,
                    {
                      color:
                        s.status === 'success'
                          ? Colors.success
                          : s.status === 'failed'
                          ? Colors.danger
                          : Colors.warning,
                    },
                  ]}
                >
                  {s.status === 'success'
                    ? '✓ Đạt'
                    : s.status === 'failed'
                    ? '✗ Lỗi'
                    : 'Đang chạy...'}
                </Text>
              </View>
            </View>
          ))}

          {testResultMsg && (
            <View style={styles.resultBox}>
              <Text
                style={
                  testResultMsg.includes('thành công')
                    ? styles.resultSuccess
                    : styles.resultFailure
                }
              >
                {testResultMsg}
              </Text>
            </View>
          )}

          <Button
            disabled={testing}
            style={{ marginTop: 16 }}
            title={testing ? 'Đang kiểm tra...' : 'Đóng'}
            variant="primary"
            onPress={() => {
              setTestModalVisible(false);
              resetTest();
            }}
          />
        </View>
      </Modal>

      {/* Modal xác nhận xoá */}
      <Modal
        title="Xác Nhận Xoá Camera"
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
      >
        <Text style={styles.confirmText}>
          Bạn có chắc chắn muốn xoá camera "{initialCamera?.name}"? Mọi thông tin cấu hình và thông tin xác thực đã lưu sẽ bị xoá khỏi thiết bị.
        </Text>
        <View style={styles.modalBtnRow}>
          <Button
            style={styles.modalBtn}
            title="Huỷ"
            variant="secondary"
            onPress={() => setDeleteModalVisible(false)}
          />
          <Button
            style={{ ...styles.modalBtn, backgroundColor: Colors.danger }}
            title="Xoá vĩnh viễn"
            variant="primary"
            onPress={handleDelete}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddEditCameraScreen;
