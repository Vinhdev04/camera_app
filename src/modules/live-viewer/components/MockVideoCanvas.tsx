/**
 * @file MockVideoCanvas.tsx
 * @desc Dumb UI component hiển thị khung hình Video RTSP và OSD
 * @layer modules/live-viewer/components
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ViewStyle, ActivityIndicator } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { LiveViewState, StreamQuality } from '@/shared/types';
import { styles } from './MockVideoCanvas.styles';

export interface MockVideoCanvasProps {
  cameraName: string;
  quality?: StreamQuality;
  state?: LiveViewState;
  style?: ViewStyle;
}

export const MockVideoCanvas: React.FC<MockVideoCanvasProps> = ({
  cameraName,
  quality = 'main',
  state = 'playing',
  style,
}) => {
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const ms = now.getMilliseconds().toString().padStart(3, '0');
      setTimestamp(
        `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
          now.getHours()
        )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${ms}`
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 100);
    return () => clearInterval(timer);
  }, []);

  const isBuffering = state === 'buffering' || state === 'connecting' || state === 'reconnecting';
  const isFailed = state === 'failed';

  return (
    <View style={[styles.container, style]}>
      {/* Nền mô phỏng luồng camera */}
      <View style={styles.videoBackground}>
        <View style={styles.gridLines} />
      </View>

      {/* Trạng thái Loading / Buffering */}
      {isBuffering && (
        <View style={styles.centerOverlay}>
          <ActivityIndicator color={Colors.primary} size="large" />
          <Text style={styles.statusMsg}>
            {state === 'connecting'
              ? 'Đang kết nối RTSP...'
              : state === 'reconnecting'
              ? 'Đang thử kết nối lại...'
              : 'Đang tải đệm (Buffering)...'}
          </Text>
        </View>
      )}

      {/* Trạng thái lỗi */}
      {isFailed && (
        <View style={styles.centerOverlay}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.statusMsg}>Mất kết nối với Camera</Text>
        </View>
      )}

      {/* Thông tin OSD thời gian thực */}
      {!isFailed && (
        <View style={styles.osdTop}>
          <Text style={styles.osdText}>CAM: {cameraName.toUpperCase()}</Text>
          <Text style={styles.osdText}>{timestamp}</Text>
        </View>
      )}

      {/* Thông số luồng OSD góc dưới */}
      {!isFailed && (
        <View style={styles.osdBottom}>
          <View style={styles.qualityPill}>
            <Text style={styles.qualityText}>
              {quality === 'main' ? 'HD 1080p' : 'SD 360p'}
            </Text>
          </View>
          <Text style={styles.statsText}>
            H.264 · 25 FPS · {quality === 'main' ? '2.4 Mbps' : '450 Kbps'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MockVideoCanvas;

