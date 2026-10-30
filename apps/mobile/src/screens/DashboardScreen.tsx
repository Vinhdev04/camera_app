import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Button, Card, colors, EmptyState, radius, spacing, StatusBadge, typography } from '@uicv/ui-kit';
import { Camera } from '@uicv/core-contracts';
import { MockVideoCanvas } from '../components/MockVideoCanvas';

export interface DashboardScreenProps {
  cameras: Camera[];
  onSelectCamera: (camera: Camera) => void;
  onAddCamera: () => void;
  onOpenMultiView: () => void;
  onOpenSettings: () => void;
  onOpenDiagnostics: (camera: Camera) => void;
  onDeleteCamera: (id: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  cameras,
  onSelectCamera,
  onAddCamera,
  onOpenMultiView,
  onOpenSettings,
  onOpenDiagnostics,
  onDeleteCamera,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const renderCameraCard = ({ item }: { item: Camera }) => {
    return (
      <Card
        style={styles.cameraCard}
        onPress={() => onSelectCamera(item)}
      >
        {/* Preview Thumbnail giả lập */}
        <MockVideoCanvas
          cameraName={item.name}
          quality="sub"
          state={item.status === 'online' ? 'playing' : item.status === 'connecting' ? 'connecting' : 'failed'}
          style={styles.thumbnail}
        />

        {/* Nội dung thông tin thẻ camera */}
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.titleWrap}>
              <Text numberOfLines={1} style={styles.cameraName}>
                {item.name}
              </Text>
              <Text style={styles.cameraSub}>
                {item.host}:{item.port} {item.manufacturer ? `· ${item.manufacturer}` : ''}
              </Text>
            </View>
            <StatusBadge status={item.status} />
          </View>

          {Boolean(item.errorMessage) && (
            <Text numberOfLines={1} style={styles.errorText}>
              ⚠️ {item.errorMessage}
            </Text>
          )}

          <View style={styles.cardFooter}>
            <Text style={styles.timestamp}>
              Kiểm tra: {item.lastCheckedAt || 'Chưa kiểm tra'}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => onOpenDiagnostics(item)}
                style={styles.diagBtn}
              >
                <Text style={styles.diagText}>Chẩn đoán</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>UICV Camera</Text>
          <Text style={styles.subtitle}>{cameras.length} camera trong LAN</Text>
        </View>

        <View style={styles.headerActions}>
          <Button
            style={styles.gridBtn}
            title="Lưới"
            variant="secondary"
            onPress={onOpenMultiView}
          />
          <Button
            style={styles.addBtn}
            title="+ Thêm"
            variant="primary"
            onPress={onAddCamera}
          />
        </View>
      </View>

      {/* Danh sách Camera */}
      {cameras.length === 0 ? (
        <EmptyState
          actionTitle="Thêm Camera Đầu Tiên"
          description="Chưa có camera nào được thêm vào hệ thống. Hãy thêm camera IP qua RTSP để bắt đầu giám sát trực tiếp trong LAN."
          title="Không Có Camera"
          onAction={onAddCamera}
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={cameras}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={refreshing}
              tintColor={colors.primary}
              onRefresh={handleRefresh}
            />
          }
          renderItem={renderCameraCard}
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
  appTitle: {
    ...typography.titleLg,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  gridBtn: {
    minHeight: 38,
    paddingHorizontal: spacing.md,
  },
  addBtn: {
    minHeight: 38,
    paddingHorizontal: spacing.md,
  },
  listContainer: {
    padding: spacing.lg,
  },
  cameraCard: {
    padding: 0,
    overflow: 'hidden',
  },
  thumbnail: {
    borderTopLeftRadius: radius.lg - 1,
    borderTopRightRadius: radius.lg - 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  titleWrap: {
    flex: 1,
    marginRight: spacing.sm,
  },
  cameraName: {
    ...typography.bodyBold,
    fontSize: 16,
  },
  cameraSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.surfaceElevated,
  },
  timestamp: {
    ...typography.caption,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  diagBtn: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  diagText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
