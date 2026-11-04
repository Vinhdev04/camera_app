/**
 * @file AuthScreen.tsx
 * @desc Màn hình Đăng nhập / Đăng ký / Chế độ tài khoản chuẩn UI Prototype SCR-11
 * @layer modules/auth/screens
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { commonStyles } from '@/shared/styles';
import { Button } from '@/shared/components';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { LocalModeNotice } from '../components/LocalModeNotice';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';
import { styles } from './AuthScreen.styles';

export interface AuthScreenProps {
  onNavigateBack: () => void;
  onLoginSuccess?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onNavigateBack,
  onLoginSuccess,
}) => {
  const {
    user,
    isAuthenticated,
    authMode,
    authTab,
    isLoading,
    error,
    setAuthMode,
    setAuthTab,
    clearError,
    login,
    register,
    loginWithBiometrics,
    logout,
  } = useAuth();

  const [isForgotModalVisible, setIsForgotModalVisible] = useState(false);

  // Xử lý đăng nhập thành công
  const handleLoginSubmit = async (credentials: any) => {
    const success = await login(credentials);
    if (success && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  // Xử lý đăng ký thành công
  const handleRegisterSubmit = async (credentials: any) => {
    const success = await register(credentials);
    if (success && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  // Xử lý đăng nhập sinh trắc học thành công
  const handleBiometricSubmit = async () => {
    const success = await loginWithBiometrics();
    if (success && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Navigation Bar */}
          <View style={styles.headerNav}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.backBtn}
              onPress={onNavigateBack}
            >
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>

            <View style={styles.roadmapBadge}>
              <Text style={styles.roadmapBadgeText}>PHASE 4 · ROADMAP</Text>
            </View>
          </View>

          {/* Logo & Tiêu đề thương hiệu UICV */}
          <View style={styles.brandWrap}>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoIconText}>📹</Text>
              </View>
              <View>
                <Text style={styles.logoTitle}>UICV</Text>
                <Text style={styles.logoSubtitle}>LAN · RTSP · ONVIF</Text>
              </View>
            </View>

            <Text style={styles.pageTitle}>
              {authTab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </Text>
            <Text style={styles.pageSubtitle}>
              {authTab === 'login'
                ? 'Đồng bộ cấu hình và bật truy cập từ xa'
                : 'Khởi tạo tài khoản để sao lưu cấu hình đám mây'}
            </Text>
          </View>

          {/* Bộ chọn Chế độ: Cục bộ | Tài khoản */}
          <View style={styles.modeSegmentWrap}>
            <View style={commonStyles.segmentContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  commonStyles.segmentItem,
                  authMode === 'local' && commonStyles.segmentItemActive,
                ]}
                onPress={() => {
                  clearError();
                  setAuthMode('local');
                }}
              >
                <Text
                  style={[
                    commonStyles.segmentText,
                    authMode === 'local' && commonStyles.segmentTextActive,
                  ]}
                >
                  Cục bộ
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  commonStyles.segmentItem,
                  authMode === 'account' && commonStyles.segmentItemActive,
                ]}
                onPress={() => {
                  clearError();
                  setAuthMode('account');
                }}
              >
                <Text
                  style={[
                    commonStyles.segmentText,
                    authMode === 'account' && commonStyles.segmentTextActive,
                  ]}
                >
                  Tài khoản
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nội dung theo trạng thái */}
          {authMode === 'local' ? (
            <LocalModeNotice onContinueLocal={onNavigateBack} />
          ) : isAuthenticated && user ? (
            /* Khi người dùng đã đăng nhập thành công */
            <View style={styles.accountCard}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>👤</Text>
              </View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>

              <Button
                style={styles.logoutBtn}
                title="Đăng Xuất Tài Khoản"
                variant="danger"
                onPress={logout}
              />
            </View>
          ) : authTab === 'login' ? (
            /* Form Đăng nhập */
            <LoginForm
              errorMessage={error}
              isLoading={isLoading}
              onBiometricLogin={handleBiometricSubmit}
              onForgotPassword={() => setIsForgotModalVisible(true)}
              onSubmit={handleLoginSubmit}
              onSwitchToRegister={() => {
                clearError();
                setAuthTab('register');
              }}
            />
          ) : (
            /* Form Đăng ký */
            <RegisterForm
              errorMessage={error}
              isLoading={isLoading}
              onSubmit={handleRegisterSubmit}
              onSwitchToLogin={() => {
                clearError();
                setAuthTab('login');
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal Quên mật khẩu */}
      <ForgotPasswordModal
        visible={isForgotModalVisible}
        onClose={() => setIsForgotModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default AuthScreen;
