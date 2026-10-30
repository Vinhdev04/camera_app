import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, CameraInput } from '@uicv/core-contracts';
import { FakeCameraRepository } from '@uicv/adapter-mock-data';
import { colors } from '@uicv/ui-kit';

import { OnboardingScreen } from '../screens/OnboardingScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AddEditCameraScreen } from '../screens/AddEditCameraScreen';
import { LiveViewerScreen } from '../screens/LiveViewerScreen';
import { MultiViewScreen } from '../screens/MultiViewScreen';
import { DiagnosticsScreen } from '../screens/DiagnosticsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

type ScreenType =
  | 'onboarding'
  | 'dashboard'
  | 'add-camera'
  | 'edit-camera'
  | 'live-view'
  | 'multi-view'
  | 'diagnostics'
  | 'settings';

const cameraRepo = new FakeCameraRepository();

export const RootNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  // Tải danh sách camera khi khởi chạy
  React.useEffect(() => {
    loadCameras();
  }, []);

  const loadCameras = async () => {
    const list = await cameraRepo.getAll();
    setCameras(list);
  };

  const handleSaveCamera = async (input: CameraInput) => {
    if (selectedCamera && currentScreen === 'edit-camera') {
      await cameraRepo.update(selectedCamera.id, input);
    } else {
      await cameraRepo.create(input);
    }
    await loadCameras();
    setCurrentScreen('dashboard');
  };

  const handleDeleteCamera = async (id: string) => {
    await cameraRepo.delete(id);
    await loadCameras();
    setCurrentScreen('dashboard');
  };

  const handleResetAll = async () => {
    // Reset về danh sách mặc định
    const list = await cameraRepo.getAll();
    for (const c of list) {
      await cameraRepo.delete(c.id);
    }
    await loadCameras();
    setCurrentScreen('dashboard');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={() => setCurrentScreen('dashboard')} />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen
          cameras={cameras}
          onAddCamera={() => {
            setSelectedCamera(null);
            setCurrentScreen('add-camera');
          }}
          onDeleteCamera={handleDeleteCamera}
          onOpenDiagnostics={(cam) => {
            setSelectedCamera(cam);
            setCurrentScreen('diagnostics');
          }}
          onOpenMultiView={() => setCurrentScreen('multi-view')}
          onOpenSettings={() => setCurrentScreen('settings')}
          onSelectCamera={(cam) => {
            setSelectedCamera(cam);
            setCurrentScreen('live-view');
          }}
        />
      )}

      {currentScreen === 'add-camera' && (
        <AddEditCameraScreen
          onCancel={() => setCurrentScreen('dashboard')}
          onSave={handleSaveCamera}
        />
      )}

      {currentScreen === 'edit-camera' && selectedCamera && (
        <AddEditCameraScreen
          initialCamera={selectedCamera}
          onCancel={() => setCurrentScreen('dashboard')}
          onDelete={handleDeleteCamera}
          onSave={handleSaveCamera}
        />
      )}

      {currentScreen === 'live-view' && selectedCamera && (
        <LiveViewerScreen
          camera={selectedCamera}
          onBack={() => setCurrentScreen('dashboard')}
          onEdit={() => setCurrentScreen('edit-camera')}
        />
      )}

      {currentScreen === 'multi-view' && (
        <MultiViewScreen
          cameras={cameras}
          onBack={() => setCurrentScreen('dashboard')}
          onSelectCamera={(cam) => {
            setSelectedCamera(cam);
            setCurrentScreen('live-view');
          }}
        />
      )}

      {currentScreen === 'diagnostics' && selectedCamera && (
        <DiagnosticsScreen
          camera={selectedCamera}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen
          onBack={() => setCurrentScreen('dashboard')}
          onResetAllData={handleResetAll}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
