/**
 * @file MultiViewScreen.tsx
 * @desc Màn hình hiển thị lưới giám sát đồng thời nhiều camera (Smart Screen)
 * @layer modules/multi-view/screens
 */

import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button } from '@/shared/components';
import { Camera } from '@/shared/types';
import { useMultiView } from '../hooks/useMultiView';
import { MultiViewGrid } from '../components/MultiViewGrid';
import { styles } from './MultiViewScreen.styles';

export interface MultiViewScreenProps {
  onNavigateBack: () => void;
  onNavigateToLive: (camera: Camera) => void;
}

export const MultiViewScreen: React.FC<MultiViewScreenProps> = ({
  onNavigateBack,
  onNavigateToLive,
}) => {
  // Lấy danh sách camera dạng lưới trực tiếp từ hook useMultiView (Không prop-drilling)
  const { gridCameras, selectCamera } = useMultiView();

  const handleSelectCamera = (camera: Camera) => {
    selectCamera(camera);
    onNavigateToLive(camera);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="← Danh sách" variant="ghost" onPress={onNavigateBack} />
        <Text style={styles.title}>Lưới Đa Camera (2×2)</Text>
        <View style={styles.headerRight}>
          <Text style={styles.substreamBadge}>Sub-stream SD</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        <MultiViewGrid
          cameras={gridCameras}
          onSelectCamera={handleSelectCamera}
        />

        <View style={styles.helperBanner}>
          <Text style={styles.helperText}>
            💡 Mẹo: Chế độ đa màn hình luôn tự động chuyển sang luồng phụ (Sub-stream) để tiết kiệm băng thông Wi-Fi và chống tràn RAM trên thiết bị di động. Nhấn vào một ô để phóng to xem luồng Full HD.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MultiViewScreen;

