/**
 * @file CameraCard.tsx
 * @desc Dumb UI component hiển thị thông tin thẻ camera
 * @layer modules/camera/components
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, StatusBadge } from '@/shared/components';
import { MockVideoCanvas } from '@/modules/live-viewer/components/MockVideoCanvas';
import { CameraCardProps } from '../types';
import { styles } from './CameraCard.styles';

export const CameraCard: React.FC<CameraCardProps> = ({
  camera,
  onPress,
  onDiagnostics,
}) => {
  return (
    <Card style={styles.card} onPress={() => onPress(camera)}>
      <MockVideoCanvas
        cameraName={camera.name}
        quality="sub"
        state={
          camera.status === 'online'
            ? 'playing'
            : camera.status === 'connecting'
            ? 'connecting'
            : 'failed'
        }
        style={styles.thumbnail}
      />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleWrap}>
            <Text numberOfLines={1} style={styles.cameraName}>
              {camera.name}
            </Text>
            <Text style={styles.cameraSub}>
              {camera.host}:{camera.port} {camera.manufacturer ? `· ${camera.manufacturer}` : ''}
            </Text>
          </View>
          <StatusBadge status={camera.status} />
        </View>

        {Boolean(camera.errorMessage) && (
          <Text numberOfLines={1} style={styles.errorText}>
            ⚠️ {camera.errorMessage}
          </Text>
        )}

        <View style={styles.cardFooter}>
          <Text style={styles.timestamp}>
            Kiểm tra: {camera.lastCheckedAt || 'Chưa kiểm tra'}
          </Text>
          <TouchableOpacity
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.diagBtn}
            onPress={() => onDiagnostics(camera)}
          >
            <Text style={styles.diagText}>Chẩn đoán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default CameraCard;

