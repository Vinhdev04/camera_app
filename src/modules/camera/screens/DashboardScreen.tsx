/**
 * @file DashboardScreen.tsx
 * @desc Màn hình danh sách Camera chính trong mạng LAN (Smart Screen)
 * @layer modules/camera/screens
 */

import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Button, EmptyState } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { Camera } from '@/shared/types';
import { useCameras } from '../hooks/useCameras';
import { CameraCard } from '../components/CameraCard';
import { styles } from './DashboardScreen.styles';

export interface DashboardScreenProps {
  onNavigateToAdd: () => void;
  onNavigateToLive: (camera: Camera) => void;
  onNavigateToMultiView: () => void;
  onNavigateToSettings: () => void;
  onNavigateToDiagnostics: (camera: Camera) => void;
  onNavigateToAuth?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateToAdd,
  onNavigateToLive,
  onNavigateToMultiView,
  onNavigateToSettings,
  onNavigateToDiagnostics,
  onNavigateToAuth,
}) => {
  // Lấy dữ liệu và hành vi trực tiếp từ hook của module (Không prop-drilling)
  const { cameras, selectCamera, refreshCameras } = useCameras();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshCameras();
    setRefreshing(false);
  };

  const handleSelectCamera = (camera: Camera) => {
    selectCamera(camera);
    onNavigateToLive(camera);
  };

  const handleDiagnostics = (camera: Camera) => {
    selectCamera(camera);
    onNavigateToDiagnostics(camera);
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
            style={styles.settingsBtn}
            title="⚙️"
            variant="ghost"
            onPress={onNavigateToSettings}
          />
          <Button
            style={styles.gridBtn}
            title="Lưới"
            variant="secondary"
            onPress={onNavigateToMultiView}
          />
          <Button
            style={styles.addBtn}
            title="+ Thêm"
            variant="primary"
            onPress={onNavigateToAdd}
          />
        </View>
      </View>

      {/* Danh sách Camera kèm Header Quick Nav */}
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={cameras}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          /* Khối Quick Nav 3 thẻ theo đúng thiết kế SCR-02 */
          <View style={styles.quickNavRow}>
            <View style={styles.quickNavCard}>
              <Text style={styles.quickNavIcon}>📼</Text>
              <Text style={styles.quickNavTitle}>Bản ghi</Text>
              <Text style={styles.quickNavSub}>SCR-13</Text>
            </View>

            <View style={styles.quickNavCard}>
              <Text style={styles.quickNavIcon}>🌐</Text>
              <Text style={styles.quickNavTitle}>Từ xa</Text>
              <Text style={styles.quickNavSub}>SCR-12</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.quickNavCard}
              onPress={onNavigateToAuth}
            >
              <Text style={styles.quickNavIcon}>👤</Text>
              <Text style={styles.quickNavTitle}>Đăng nhập</Text>
              <Text style={styles.quickNavSub}>SCR-11</Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            actionTitle="Thêm Camera Đầu Tiên"
            description="Chưa có camera nào được thêm vào hệ thống. Hãy thêm camera IP qua RTSP để bắt đầu giám sát trực tiếp trong LAN."
            title="Không Có Camera"
            onAction={onNavigateToAdd}
          />
        }
        refreshControl={
          <RefreshControl
            colors={[Colors.primary]}
            refreshing={refreshing}
            tintColor={Colors.primary}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({ item }) => (
          <CameraCard
            camera={item}
            onDiagnostics={handleDiagnostics}
            onPress={handleSelectCamera}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
