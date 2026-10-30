import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Button, colors, radius, spacing, StatusBadge, typography } from '@uicv/ui-kit';
import { Camera } from '@uicv/core-contracts';
import { MockVideoCanvas } from '../components/MockVideoCanvas';

export interface MultiViewScreenProps {
  cameras: Camera[];
  onBack: () => void;
  onSelectCamera: (camera: Camera) => void;
}

export const MultiViewScreen: React.FC<MultiViewScreenProps> = ({
  cameras,
  onBack,
  onSelectCamera,
}) => {
  // Lấy tối đa 4 camera đầu tiên cho lưới 2x2
  const gridCameras = cameras.slice(0, 4);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="← Danh sách" variant="ghost" onPress={onBack} />
        <Text style={styles.title}>Lưới Đa Camera (2×2)</Text>
        <View style={styles.headerRight}>
          <Text style={styles.substreamBadge}>Sub-stream SD</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.grid}>
          {gridCameras.map((cam) => (
            <TouchableOpacity
              key={cam.id}
              activeOpacity={0.8}
              style={styles.gridCell}
              onPress={() => onSelectCamera(cam)}
            >
              <MockVideoCanvas
                cameraName={cam.name}
                quality="sub"
                state={cam.status === 'online' ? 'playing' : cam.status === 'connecting' ? 'connecting' : 'failed'}
                style={styles.cellVideo}
              />
              <View style={styles.cellHeader}>
                <Text numberOfLines={1} style={styles.cellName}>
                  {cam.name}
                </Text>
                <StatusBadge status={cam.status} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.gridNote}>
          💡 Chạm vào ô bất kỳ để phóng to xem trực tiếp luồng HD và điều khiển PTZ.
        </Text>
      </ScrollView>
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
  headerRight: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.sm,
  },
  substreamBadge: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  gridContainer: {
    padding: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  gridCell: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  cellVideo: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  cellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
  },
  cellName: {
    ...typography.bodyBold,
    fontSize: 12,
    flex: 1,
    marginRight: 4,
  },
  gridNote: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.textMuted,
  },
});
