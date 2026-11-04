/**
 * @file AuthScreen.tsx
 * @desc Màn hình Xác thực Clean UI, không emoji, hỗ trợ Đăng nhập Tài khoản / Quét mã QR / Chế độ Cục bộ
 * Tích hợp hiệu ứng chuyển cảnh Smooth Animated, Shimmer Skeleton và xử lý 404 Error State
 * @layer modules/auth/screens
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
} from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { radius, spacing } from '@/shared/styles/tokens';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { ForgotPasswordView } from '../components/ForgotPasswordView';
import { LocalModeNotice } from '../components/LocalModeNotice';
import { QrLoginView } from '../components/QrLoginView';
import { AuthSkeleton } from '../components/AuthSkeleton';
import { BackIcon, CameraIcon, QrIcon, UserIcon } from '../components/CleanIcons';

export type AuthMainTab = 'account' | 'qr' | 'local';
export type AccountSubView = 'login' | 'register' | 'forgot-password';

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
    isLoading,
    error,
    clearError,
    login,
    register,
    loginWithBiometrics,
    logout,
  } = useAuth();

  const [mainTab, setMainTab] = useState<AuthMainTab>('account');
  const [subView, setSubView] = useState<AccountSubView>('login');
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  // Animation mờ dần và trượt nhẹ khi chuyển view
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const triggerTransition = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 8,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleSwitchMainTab = (newTab: AuthMainTab) => {
    if (newTab === mainTab) return;
    clearError();
    triggerTransition(() => setMainTab(newTab));
  };

  const handleSwitchSubView = (newView: AccountSubView) => {
    clearError();
    triggerTransition(() => setSubView(newView));
  };

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

  // Xử lý quét QR thành công
  const handleQrSuccess = () => {
    handleBiometricSubmit();
  };

  const getPageTitle = () => {
    if (mainTab === 'qr') return 'Đăng nhập bằng mã QR';
    if (mainTab === 'local') return 'Chế độ mạng nội bộ';
    if (subView === 'register') return 'Tạo tài khoản mới';
    if (subView === 'forgot-password') return 'Khôi phục mật khẩu';
    return 'Đăng nhập tài khoản';
  };

  const getPageSubtitle = () => {
    if (mainTab === 'qr') return 'Quét mã xác thực nhanh từ camera hoặc ứng dụng Web CMS';
    if (mainTab === 'local') return 'Giám sát trực tiếp trong LAN, không cần tạo tài khoản đám mây';
    if (subView === 'register') return 'Khởi tạo tài khoản UICV để sao lưu và đồng bộ cấu hình';
    if (subView === 'forgot-password') return 'Nhận liên kết bảo mật để thiết lập lại mật khẩu';
    return 'Đồng bộ cấu hình và bật quyền truy cập camera từ xa';
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
                  if (mainTab !== 'account' || subView !== 'login') {
                    clearError();
                    setMainTab('account');
                    setSubView('login');
                  } else {
                    onNavigateBack();
                  }
                }}
              >
                <BackIcon color={Colors.palette.slate[800]} size={16} />
              </TouchableOpacity>

              <View style={styles.roadmapTag}>
                <Text style={styles.roadmapTagText}>PHASE 4 · ROADMAP</Text>
              </View>
            </View>

            {/* 2. Cụm Logo & Nhận diện thương hiệu UICV (Clean UI, không emoji) */}
            <View style={styles.brandHeader}>
              <View style={styles.logoRow}>
                <View style={styles.cameraIconBadge}>
                  <CameraIcon color={Colors.white} size={20} />
                </View>
                <View>
                  <Text style={styles.brandName}>UICV</Text>
                  <Text style={styles.brandSpecs}>LAN · RTSP · ONVIF</Text>
                </View>
              </View>

              <Text style={styles.pageTitle}>{getPageTitle()}</Text>
              <Text style={styles.pageSubtitle}>{getPageSubtitle()}</Text>
            </View>

            {/* 3. Segment Control 3 Tab mượt mà (Tài khoản | Quét QR | Cục bộ) */}
            <View style={styles.segmentContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.segmentButton,
                  mainTab === 'account' && styles.segmentButtonActive,
                ]}
                onPress={() => handleSwitchMainTab('account')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    mainTab === 'account' && styles.segmentTextActive,
                  ]}
                >
                  Tài khoản
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.segmentButton,
                  mainTab === 'qr' && styles.segmentButtonActive,
                ]}
                onPress={() => handleSwitchMainTab('qr')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    mainTab === 'qr' && styles.segmentTextActive,
                  ]}
                >
                  Mã QR
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.segmentButton,
                  mainTab === 'local' && styles.segmentButtonActive,
                ]}
                onPress={() => handleSwitchMainTab('local')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    mainTab === 'local' && styles.segmentTextActive,
                  ]}
                >
                  Cục bộ
                </Text>
              </TouchableOpacity>
            </View>

            {/* 4. Khung Nội dung có hiệu ứng Chuyển cảnh Smooth Animated */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {isInitialLoading ? (
                /* Skeleton Shimmer Loading */
                <AuthSkeleton />
              ) : mainTab === 'qr' ? (
                /* Chế độ Đăng nhập bằng Mã QR */
                <QrLoginView
                  onQrLoginSuccess={handleQrSuccess}
                  onSwitchToAccount={() => handleSwitchMainTab('account')}
                />
              ) : mainTab === 'local' ? (
                /* Chế độ Cục bộ */
                <LocalModeNotice onContinueLocal={onNavigateBack} />
              ) : isAuthenticated && user ? (
                /* Người dùng đã đăng nhập */
                <View style={styles.userCard}>
                  <View style={styles.avatarCircle}>
                    <UserIcon color={Colors.primary} size={32} />
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
                  onBackToLogin={() => handleSwitchSubView('login')}
                />
              ) : subView === 'register' ? (
                /* View Đăng ký tài khoản */
                <RegisterForm
                  errorMessage={error}
                  isLoading={isLoading}
                  onSubmit={handleRegisterSubmit}
                  onSwitchToLogin={() => handleSwitchSubView('login')}
                />
              ) : (
                /* View Đăng nhập (Mặc định) */
                <LoginForm
                  errorMessage={error}
                  isLoading={isLoading}
                  onBiometricLogin={handleBiometricSubmit}
                  onForgotPassword={() => handleSwitchSubView('forgot-password')}
                  onSubmit={handleLoginSubmit}
                  onSwitchToRegister={() => handleSwitchSubView('register')}
                />
              )}
            </Animated.View>
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
    marginBottom: spacing.md + 2,
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
    fontSize: 26,
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
    fontSize: 13,
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
