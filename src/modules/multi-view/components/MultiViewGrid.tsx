/**
 * @file MultiViewGrid.tsx
 * @desc Dumb UI component hiển thị danh sách các ô camera dạng lưới 2x2
 * @layer modules/multi-view/components
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBadge } from '@/shared/components';
import { MockVideoCanvas } from '@/modules/live-viewer/components/MockVideoCanvas';
import { MultiViewGridProps } from '../types';
import { styles } from './MultiViewGrid.styles';

export const MultiViewGrid: React.FC<MultiViewGridProps> = ({
  cameras,
  onSelectCamera,
}) => {
  return (
    <View style={styles.grid}>
      {cameras.map((cam) => (
        <TouchableOpacity
          key={cam.id}
          activeOpacity={0.8}
          style={styles.gridCell}
          onPress={() => onSelectCamera(cam)}
        >
          <MockVideoCanvas
            cameraName={cam.name}
            quality="sub"
            state={
              cam.status === 'online'
                ? 'playing'
                : cam.status === 'connecting'
                ? 'connecting'
                : 'failed'
            }
            style={styles.cellVideo}
          />
          <View style={styles.cellFooter}>
            <Text numberOfLines={1} style={styles.cellName}>
              {cam.name}
            </Text>
            <StatusBadge status={cam.status} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultiViewGrid;

