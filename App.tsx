/**
 * @file App.tsx
 * @desc Entry point của ứng dụng di động UICV Camera
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { CameraStoreProvider } from '@/modules/camera';
import { RootNavigator } from '@/navigation/RootNavigator';
import { Colors } from '@/shared/constants/Colors';

export default function App() {
  return (
    <CameraStoreProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <RootNavigator />
      </View>
    </CameraStoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
