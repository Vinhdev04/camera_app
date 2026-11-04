/**
 * @file AuthScreen.tsx
 * @desc Màn hình Xác thực (Đăng nhập / Đăng ký / Quên mật khẩu) chuẩn theo UI Prototype SCR-11
 * Tối ưu responsive 100% trên cả thiết bị di động (360px - 440px) và tablet/web
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
  StyleSheet,
} from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { ForgotPasswordView } from '../components/ForgotPasswordView';
import { LocalModeNotice } from '../components/LocalModeNotice';

export type AuthSubView = 'login' | 'register' | 'forgot-password';

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
    isLoading,
    error,
    setAuthMode,
    clearError,
    login,
    register,
    loginWithBiometrics,
    logout,
  } = useAuth();

  const [subView, setSubView] = useState<AuthSubView>('login');

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

  const getPageTitle = () => {
    if (subView === 'register') return 'Tạo tài khoản';
    if (subView === 'forgot-password') return 'Quên mật khẩu';
    return 'Đăng nhập';
  };

  const getPageSubtitle = () => {
    if (subView === 'register') return 'Khởi tạo tài khoản để sao lưu cấu hình đám mây';
    if (subView === 'forgot-password') return 'Khôi phục quyền truy cập vào tài khoản của bạn';
    return 'Đồng bộ cấu hình và bật truy cập từ xa';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentWrapper}>
            {/* 1. Top Navigation Bar (Nút Back & Tag Roadmap) */}
            <View style={styles.topNavRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.backButton}
                onPress={() => {
                  if (subView !== 'login') {
                    clearError();
                    setSubView('login');
                  } else {
                    onNavigateBack();
                  }
                }}
              >
                <Text style={styles.backIcon}>‹</Text>
              </TouchableOpacity>

              <View style={styles.roadmapTag}>
                <Text style={styles.roadmapTagText}>PHASE 4 · ROADMAP</Text>
              </View>
            </View>

            {/* 2. Cụm Logo & Nhận diện thương hiệu UICV */}
            <View style={styles.brandHeader}>
              <View style={styles.logoRow}>
                <View style={styles.cameraIconBadge}>
                  <Text style={styles.cameraIconSymbol}>📹</Text>
                </View>
                <View>
                  <Text style={styles.brandName}>UICV</Text>
                  <Text style={styles.brandSpecs}>LAN · RTSP · ONVIF</Text>
                </View>
              </View>

              <Text style={styles.pageTitle}>{getPageTitle()}</Text>
              <Text style={styles.pageSubtitle}>{getPageSubtitle()}</Text>
            </View>

            {/* 3. Bộ chuyển Chế độ: Cục bộ | Tài khoản (Chỉ hiển thị khi không ở màn Forgot Password) */}
            {subView !== 'forgot-password' && (
              <View style={styles.segmentContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.segmentButton,
                    authMode === 'local' && styles.segmentButtonActive,
                  ]}
                  onPress={() => {
                    clearError();
                    setAuthMode('local');
                  }}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      authMode === 'local' && styles.segmentTextActive,
                    ]}
                  >
                    Cục bộ
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.segmentButton,
                    authMode === 'account' && styles.segmentButtonActive,
                  ]}
                  onPress={() => {
                    clearError();
                    setAuthMode('account');
                  }}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      authMode === 'account' && styles.segmentTextActive,
                    ]}
                  >
                    Tài khoản
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 4. Nội dung theo trạng thái */}
            {authMode === 'local' ? (
              <LocalModeNotice onContinueLocal={onNavigateBack} />
            ) : isAuthenticated && user ? (
              /* Đã đăng nhập */
              <View style={styles.userCard}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarSymbol}>👤</Text>
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.logoutButton}
                  onPress={logout}
                >
                  <Text style={styles.logoutButtonText}>Đăng Xuất Tài Khoản</Text>
                </TouchableOpacity>
              </View>
            ) : subView === 'forgot-password' ? (
              /* View Quên mật khẩu */
              <ForgotPasswordView
                onBackToLogin={() => {
                  clearError();
                  setSubView('login');
                }}
              />
            ) : subView === 'register' ? (
              /* View Đăng ký tài khoản */
              <RegisterForm
                errorMessage={error}
                isLoading={isLoading}
                onSubmit={handleRegisterSubmit}
                onSwitchToLogin={() => {
                  clearError();
                  setSubView('login');
                }}
              />
            ) : (
              /* View Đăng nhập (Mặc định) */
              <LoginForm
                errorMessage={error}
                isLoading={isLoading}
                onBiometricLogin={handleBiometricSubmit}
                onForgotPassword={() => {
                  clearError();
                  setSubView('forgot-password');
                }}
                onSubmit={handleLoginSubmit}
                onSwitchToRegister={() => {
                  clearError();
                  setSubView('register');
                }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg + 2,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  topNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: Colors.palette.slate[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: Colors.palette.slate[800],
    fontWeight: '600',
    marginTop: -2,
  },
  roadmapTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: Colors.palette.red[50],
    borderWidth: 1,
    borderColor: Colors.palette.red[200],
  },
  roadmapTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.8,
  },
  brandHeader: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    marginBottom: spacing.md,
  },
  cameraIconBadge: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: Colors.palette.slate[900],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconSymbol: {
    fontSize: 18,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.palette.slate[900],
    letterSpacing: 0.5,
  },
  brandSpecs: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.palette.slate[400],
    letterSpacing: 1.5,
    marginTop: 1,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.palette.slate[900],
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: Colors.palette.slate[500],
    lineHeight: 18,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.palette.slate[100],
    borderRadius: radius.md + 2,
    padding: 3,
    marginBottom: spacing.md + 2,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  segmentButtonActive: {
    backgroundColor: Colors.palette.slate[900],
    shadowColor: Colors.palette.slate[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.palette.slate[600],
  },
  segmentTextActive: {
    color: Colors.white,
    fontWeight: '700',
  },
  userCard: {
    backgroundColor: Colors.white,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: Colors.palette.slate[200],
    padding: spacing.xl,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.palette.red[50],
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarSymbol: {
    fontSize: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.palette.slate[900],
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.palette.slate[500],
    marginBottom: spacing.xl,
  },
  logoutButton: {
    width: '100%',
    minHeight: 48,
    backgroundColor: Colors.danger,
    borderRadius: radius.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});

export default AuthScreen;
