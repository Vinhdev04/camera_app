/**
 * @file App.tsx
 * @desc Entry point của ứng dụng di động UICV Camera
 * Chế độ tập trung hoàn thiện giao diện Xác thực (Đăng nhập / Đăng ký / Quên mật khẩu)
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { CameraStoreProvider } from '@/modules/camera';
import { AuthScreen } from '@/modules/auth';
import { Colors } from '@/shared/constants/Colors';

export default function App() {
  return (
    <CameraStoreProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <AuthScreen
          onLoginSuccess={() => {
            // Khi đăng nhập thành công
          }}
          onNavigateBack={() => {
            // Nút quay lại
          }}
        />
      </View>
    </CameraStoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
