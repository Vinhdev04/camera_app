import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, colors, radius, spacing, StatusBadge, typography } from '@uicv/ui-kit';
import { Camera, LiveViewState, StreamQuality } from '@uicv/core-contracts';
import { MockVideoCanvas } from '../components/MockVideoCanvas';

export interface LiveViewerScreenProps {
  camera: Camera;
  onBack: () => void;
  onEdit: () => void;
}

export const LiveViewerScreen: React.FC<LiveViewerScreenProps> = ({
  camera,
  onBack,
  onEdit,
}) => {
  const [quality, setQuality] = useState<StreamQuality>('main');
  const [liveState, setLiveState] = useState<LiveViewState>('playing');
  const [showPtz, setShowPtz] = useState(false);
  const [snapshotAlert, setSnapshotAlert] = useState<string | null>(null);

  const handleTakeSnapshot = () => {
    const time = new Date().toLocaleTimeString();
    setSnapshotAlert(`Đã lưu ảnh chụp nhanh lúc ${time} vào Thư viện ảnh!`);
    setTimeout(() => setSnapshotAlert(null), 3000);
  };

  const handlePtz = (direction: string) => {
    // Phản hồi thao tác PTZ
    Alert.alert('Lệnh PTZ', `Đã gửi tín hiệu xoay: ${direction.toUpperCase()}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <Button title="← Quay lại" variant="ghost" onPress={onBack} />
        <View style={styles.titleWrap}>
          <Text numberOfLines={1} style={styles.cameraName}>
            {camera.name}
          </Text>
          <Text style={styles.cameraIp}>{camera.host}:{camera.port}</Text>
        </View>
        <Button title="Cài đặt" variant="secondary" onPress={onEdit} />
      </View>

      {/* Thông báo chụp ảnh snapshot */}
      {snapshotAlert && (
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>{snapshotAlert}</Text>
        </View>
      )}

      {/* Khung hiển thị Video Player */}
      <View style={styles.playerContainer}>
        <MockVideoCanvas
          cameraName={camera.name}
          quality={quality}
          state={liveState}
          style={styles.player}
        />
      </View>

      {/* Thanh điều khiển luồng chính */}
      <View style={styles.controlBar}>
        <View style={styles.streamToggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, quality === 'main' && styles.activeToggle]}
            onPress={() => setQuality('main')}
          >
            <Text style={[styles.toggleText, quality === 'main' && styles.activeToggleText]}>
              HD (Main)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, quality === 'sub' && styles.activeToggle]}
            onPress={() => setQuality('sub')}
          >
            <Text style={[styles.toggleText, quality === 'sub' && styles.activeToggleText]}>
              SD (Sub)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionBtns}>
          <Button
            title="📸 Chụp ảnh"
            variant="secondary"
            onPress={handleTakeSnapshot}
          />
          <Button
            title={showPtz ? 'Ẩn PTZ' : '🕹️ Phím PTZ'}
            variant="secondary"
            onPress={() => setShowPtz(!showPtz)}
          />
        </View>
      </View>

      {/* Bảng D-Pad điều khiển PTZ (Xoay 4 hướng + Zoom) */}
      {showPtz && (
        <View style={styles.ptzContainer}>
          <Text style={styles.ptzTitle}>Điều khiển Xoay / Gật / Phóng to (PTZ)</Text>
          <View style={styles.dpad}>
            <TouchableOpacity style={styles.dpadUp} onPress={() => handlePtz('lên')}>
              <Text style={styles.dpadText}>▲</Text>
            </TouchableOpacity>
            <View style={styles.dpadRow}>
              <TouchableOpacity style={styles.dpadLeft} onPress={() => handlePtz('trái')}>
                <Text style={styles.dpadText}>◀</Text>
              </TouchableOpacity>
              <View style={styles.dpadCenter} />
              <TouchableOpacity style={styles.dpadRight} onPress={() => handlePtz('phải')}>
                <Text style={styles.dpadText}>▶</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.dpadDown} onPress={() => handlePtz('xuống')}>
              <Text style={styles.dpadText}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.zoomRow}>
            <TouchableOpacity style={styles.zoomBtn} onPress={() => handlePtz('Zoom In')}>
              <Text style={styles.zoomText}>🔍 Zoom In (+)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.zoomBtn} onPress={() => handlePtz('Zoom Out')}>
              <Text style={styles.zoomText}>🔍 Zoom Out (-)</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Dev Tool Tester: Bộ chuyển đổi trạng thái FSM để kiểm thử UI */}
      <View style={styles.devSection}>
        <Text style={styles.devTitle}>🛠️ UI Preview State Switcher (Thử nghiệm FSM):</Text>
        <View style={styles.devButtons}>
          {(['playing', 'buffering', 'reconnecting', 'failed'] as LiveViewState[]).map((st) => (
            <TouchableOpacity
              key={st}
              style={[
                styles.devBtn,
                liveState === st && styles.devBtnActive,
              ]}
              onPress={() => setLiveState(st)}
            >
              <Text
                style={[
                  styles.devBtnText,
                  liveState === st && styles.devBtnTextActive,
                ]}
              >
                {st.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  cameraName: {
    ...typography.bodyBold,
    fontSize: 16,
  },
  cameraIp: {
    ...typography.caption,
    marginTop: 2,
  },
  alertBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    padding: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.success,
  },
  alertText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '700',
  },
  playerContainer: {
    width: '100%',
    backgroundColor: '#000',
  },
  player: {
    width: '100%',
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  streamToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    padding: 3,
  },
  toggleBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  activeToggle: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeToggleText: {
    color: colors.textPrimary,
  },
  actionBtns: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ptzContainer: {
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  ptzTitle: {
    ...typography.caption,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  dpad: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dpadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dpadUp: {
    padding: spacing.sm,
  },
  dpadDown: {
    padding: spacing.sm,
  },
  dpadLeft: {
    padding: spacing.sm,
  },
  dpadRight: {
    padding: spacing.sm,
  },
  dpadCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceElevated,
  },
  dpadText: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  zoomRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  zoomBtn: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  zoomText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  devSection: {
    marginTop: 'auto',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  devTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.warning,
    marginBottom: spacing.xs,
  },
  devButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  devBtn: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  devBtnActive: {
    backgroundColor: colors.warning,
    borderColor: colors.warning,
  },
  devBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  devBtnTextActive: {
    color: '#000',
  },
});
