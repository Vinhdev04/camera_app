/**
 * @file ForgotPasswordView.tsx
 * @desc Component View Khôi phục mật khẩu tài khoản UICV
 * @layer modules/auth/components
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { radius, spacing } from '@/shared/styles/tokens';
import { AuthService } from '../services/auth.service';
import { AuthInput } from './AuthInput';

export interface ForgotPasswordViewProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  onBackToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await AuthService.requestPasswordReset(email);
      setIsSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gửi yêu cầu thất bại';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Icon bảo mật */}
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>🔐</Text>
      </View>

      <Text style={styles.title}>Quên mật khẩu?</Text>
      <Text style={styles.description}>
        {isSuccess
          ? `Liên kết đặt lại mật khẩu đã được gửi tới email ${email}. Vui lòng kiểm tra hộp thư đến (hoặc thư rác).`
          : 'Đừng lo lắng! Nhập địa chỉ email đăng ký của bạn, hệ thống sẽ gửi liên kết khôi phục mật khẩu bảo mật.'}
      </Text>

      {/* Thông báo thành công */}
      {isSuccess ? (
        <View style={styles.successBox}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successText}>
            Yêu cầu khôi phục đã được xử lý thành công!
          </Text>
        </View>
      ) : (
        <>
          {/* Thông báo lỗi nếu có */}
          {Boolean(error) && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerIcon}>⚠️</Text>
              <Text style={styles.errorBannerText}>{error}</Text>
            </View>
          )}

          {/* Ô nhập Email */}
          <AuthInput
            autoCapitalize="none"
            isRequired
            keyboardType="email-address"
            label="Email đăng ký"
            placeholder="an.nguyen@vidu.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError(null);
            }}
          />

          {/* Nút gửi yêu cầu */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={isLoading}
            style={[styles.submitButton, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Đang gửi yêu cầu...' : 'Gửi liên kết khôi phục'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Link quay lại đăng nhập */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backButton}
        onPress={onBackToLogin}
      >
        <Text style={styles.backButtonText}>← Quay lại Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: spacing.md,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.palette.red[50],
    borderWidth: 1.5,
    borderColor: Colors.palette.red[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.palette.slate[900],
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 13,
    color: Colors.palette.slate[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  submitButton: {
    width: '100%',
    minHeight: 50,
    backgroundColor: Colors.primary,
    borderRadius: radius.md + 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  errorBanner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.palette.red[50],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.palette.red[200],
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  errorBannerIcon: {
    fontSize: 16,
  },
  errorBannerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.danger,
    lineHeight: 18,
    fontWeight: '500',
  },
  successBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.palette.emerald[50],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.palette.emerald[100],
    padding: spacing.md,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  successIcon: {
    fontSize: 18,
  },
  successText: {
    flex: 1,
    fontSize: 13,
    color: Colors.palette.emerald[700],
    fontWeight: '600',
    lineHeight: 18,
  },
});

export default ForgotPasswordView;
