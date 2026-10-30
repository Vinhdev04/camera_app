/**
 * @file LiveViewerScreen.tsx
 * @desc Màn hình xem trực tiếp camera với tuỳ chọn chất lượng & PTZ (Smart Screen)
 * @layer modules/live-viewer/screens
 */

import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Button } from '@/shared/components';
import { Camera } from '@/shared/types';
import { Colors } from '@/shared/constants/Colors';
import { useLiveStream } from '../hooks/useLiveStream';
import { MockVideoCanvas } from '../components/MockVideoCanvas';
import { PtzPad } from '../components/PtzPad';
import { styles } from './LiveViewerScreen.styles';

export interface LiveViewerScreenProps {
  camera: Camera;
  onNavigateBack: () => void;
  onNavigateToEdit: () => void;
}

export const LiveViewerScreen: React.FC<LiveViewerScreenProps> = ({
  camera,
  onNavigateBack,
  onNavigateToEdit,
}) => {
  // Toàn bộ logic stream, PTZ, snapshot được xử lý qua hook useLiveStream
  const {
    quality,
    liveState,
    showPtz,
    snapshotAlert,
    takeSnapshot,
    sendPtz,
    reconnect,
    togglePtz,
    changeQuality,
  } = useLiveStream(camera);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <Button title="← Quay lại" variant="ghost" onPress={onNavigateBack} />
        <View style={styles.titleWrap}>
          <Text numberOfLines={1} style={styles.cameraName}>
            {camera.name}
          </Text>
          <Text style={styles.cameraIp}>{camera.host}:{camera.port}</Text>
        </View>
        <Button title="Cài đặt" variant="secondary" onPress={onNavigateToEdit} />
      </View>

      {/* Thông báo chụp ảnh snapshot */}
      {snapshotAlert && (
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>{snapshotAlert}</Text>
        </View>
      )}

      {/* Khung hình Video */}
      <View style={styles.videoArea}>
        <MockVideoCanvas
          cameraName={camera.name}
          quality={quality}
          state={liveState}
          style={styles.videoPlayer}
        />
      </View>

      {/* Thanh điều khiển luồng & chất lượng */}
      <View style={styles.streamControls}>
        <View style={styles.streamQualityBar}>
          <TouchableOpacity
            style={[styles.qualityToggleBtn, quality === 'main' && styles.qualityToggleActive]}
            onPress={() => changeQuality('main')}
          >
            <Text style={[styles.qualityToggleText, quality === 'main' && styles.qualityToggleTextActive]}>
              Main (HD)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.qualityToggleBtn, quality === 'sub' && styles.qualityToggleActive]}
            onPress={() => changeQuality('sub')}
          >
            <Text style={[styles.qualityToggleText, quality === 'sub' && styles.qualityToggleTextActive]}>
              Sub (SD)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stateBadge}>
          <View
            style={[
              styles.stateDot,
              {
                backgroundColor:
                  liveState === 'playing'
                    ? Colors.success
                    : liveState === 'failed'
                    ? Colors.danger
                    : Colors.warning,
              },
            ]}
          />
          <Text style={styles.stateText}>
            {liveState === 'playing' ? 'Trực tiếp' : liveState === 'buffering' ? 'Đệm...' : 'Mất kết nối'}
          </Text>
        </View>
      </View>

      {/* Thanh công cụ thao tác */}
      <View style={styles.actionsToolbar}>
        <TouchableOpacity style={styles.toolBtn} onPress={takeSnapshot}>
          <Text style={styles.toolIcon}>📸</Text>
          <Text style={styles.toolLabel}>Chụp ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolBtn} onPress={togglePtz}>
          <Text style={styles.toolIcon}>🕹️</Text>
          <Text style={styles.toolLabel}>{showPtz ? 'Ẩn PTZ' : 'Điều khiển'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolBtn} onPress={reconnect}>
          <Text style={styles.toolIcon}>🔄</Text>
          <Text style={styles.toolLabel}>Tải lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolBtn}
          onPress={() => Alert.alert('Ghi hình', 'Tính năng ghi hình cục bộ đang được phát triển.')}
        >
          <Text style={styles.toolIcon}>⏺️</Text>
          <Text style={styles.toolLabel}>Ghi hình</Text>
        </TouchableOpacity>
      </View>

      {/* Bảng điều khiển PTZ nếu bật */}
      {showPtz && <PtzPad onDirection={sendPtz} />}
    </SafeAreaView>
  );
};

export default LiveViewerScreen;

