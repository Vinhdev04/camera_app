/**
 * @file RootNavigator.tsx
 * @desc Navigator điều phối màn hình chính giữa các module độc lập (Clean Navigation, 0 Prop Drilling)
 * @layer navigation
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Camera } from '@/shared/types';
import { ScreenType } from './types';

// Import screens từ từng module độc lập
import { DashboardScreen, AddEditCameraScreen } from '@/modules/camera';
import { LiveViewerScreen } from '@/modules/live-viewer';
import { MultiViewScreen } from '@/modules/multi-view';
import { DiagnosticsScreen } from '@/modules/diagnostics';
import { OnboardingScreen } from '@/modules/onboarding';
import { SettingsScreen } from '@/modules/settings';

export const RootNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [activeCamera, setActiveCamera] = useState<Camera | null>(null);

  const navigateToDashboard = () => setCurrentScreen('dashboard');

  return (
    <View style={styles.container}>
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={navigateToDashboard} />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen
          onNavigateToAdd={() => {
            setActiveCamera(null);
            setCurrentScreen('add-camera');
          }}
          onNavigateToDiagnostics={(camera: Camera) => {
            setActiveCamera(camera);
            setCurrentScreen('diagnostics');
          }}
          onNavigateToLive={(camera: Camera) => {
            setActiveCamera(camera);
            setCurrentScreen('live-view');
          }}
          onNavigateToMultiView={() => setCurrentScreen('multi-view')}
          onNavigateToSettings={() => setCurrentScreen('settings')}
        />
      )}

      {currentScreen === 'add-camera' && (
        <AddEditCameraScreen
          initialCamera={null}
          onNavigateBack={navigateToDashboard}
        />
      )}

      {currentScreen === 'edit-camera' && activeCamera && (
        <AddEditCameraScreen
          initialCamera={activeCamera}
          onNavigateBack={navigateToDashboard}
        />
      )}

      {currentScreen === 'live-view' && activeCamera && (
        <LiveViewerScreen
          camera={activeCamera}
          onNavigateBack={navigateToDashboard}
          onNavigateToEdit={() => setCurrentScreen('edit-camera')}
        />
      )}

      {currentScreen === 'multi-view' && (
        <MultiViewScreen
          onNavigateBack={navigateToDashboard}
          onNavigateToLive={(camera: Camera) => {
            setActiveCamera(camera);
            setCurrentScreen('live-view');
          }}
        />
      )}

      {currentScreen === 'diagnostics' && activeCamera && (
        <DiagnosticsScreen
          camera={activeCamera}
          onNavigateBack={navigateToDashboard}
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen onNavigateBack={navigateToDashboard} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default RootNavigator;
