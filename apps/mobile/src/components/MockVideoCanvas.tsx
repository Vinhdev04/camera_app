import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { colors, radius, typography } from '@uicv/ui-kit';
import { LiveViewState, StreamQuality } from '@uicv/core-contracts';

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
          <ActivityIndicator color={colors.primary} size="large" />
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

      {/* Thông tin OSD (On-screen Display) thời gian thực */}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#05070D',
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A0F1D',
    opacity: 0.8,
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  centerOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    zIndex: 10,
  },
  statusMsg: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginTop: 8,
  },
  errorIcon: {
    fontSize: 32,
  },
  osdTop: {
    position: 'absolute',
    top: 8,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 5,
  },
  osdText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: '#00FF66', // Màu xanh lục OSD camera an ninh
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  osdBottom: {
    position: 'absolute',
    bottom: 8,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 5,
  },
  qualityPill: {
    backgroundColor: 'rgba(37, 99, 235, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  qualityText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statsText: {
    fontSize: 10,
    color: colors.textSecondary,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
