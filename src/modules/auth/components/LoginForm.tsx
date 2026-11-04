/**
 * @file LoginForm.tsx
 * @desc Component Form Đăng nhập Clean UI, không emoji, chuẩn xác 1:1 theo bản mẫu SCR-11
 * @layer modules/auth/components
 */

import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';
import { LoginCredentials } from '../types';
import { AuthInput } from './AuthInput';
import { AlertIcon, UserIcon } from './CleanIcons';

export interface LoginFormProps {
  isLoading: boolean;
  errorMessage: string | null;
  onSubmit: (credentials: LoginCredentials) => void;
  onBiometricLogin: () => void;
  onForgotPassword: () => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  isLoading,
  errorMessage,
  onSubmit,
  onBiometricLogin,
  onForgotPassword,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState('an.nguyen@vidu.com');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = () => {
    onSubmit({
      email,
      password,
      rememberMe,
    });
  };

  return (
    <View style={styles.container}>
      {/* Banner thông báo lỗi nếu có */}
      {Boolean(errorMessage) && (
        <View style={styles.errorBanner}>
          <AlertIcon color={Colors.danger} size={16} />
          <Text style={styles.errorBannerText}>{errorMessage}</Text>
        </View>
      )}

      {/* Ô nhập Email */}
      <AuthInput
        autoCapitalize="none"
        isRequired
        keyboardType="email-address"
        label="Email"
        placeholder="an.nguyen@vidu.com"
        value={email}
        onChangeText={setEmail}
      />

      {/* Ô nhập Mật khẩu */}
      <AuthInput
        isPassword
        isRequired
        label="Mật khẩu"
        placeholder="Tối thiểu 8 ký tự"
        value={password}
        onChangeText={setPassword}
      />

      {/* Hàng tùy chọn Ghi nhớ & Quên mật khẩu */}
      <View style={styles.optionsRow}>
        <View style={styles.rememberWrap}>
          <Switch
            ios_backgroundColor={Colors.palette.slate[200]}
            style={{ transform: [{ scaleX: 0.88 }, { scaleY: 0.88 }] }}
            thumbColor={Colors.white}
            trackColor={{
              false: Colors.palette.slate[200],
              true: Colors.primary,
            }}
            value={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text style={styles.rememberLabel}>Ghi nhớ đăng nhập</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
          onPress={onForgotPassword}
        >
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      {/* Nút bấm chính: Đăng nhập */}
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={isLoading}
        style={[styles.submitButton, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} size="small" />
        ) : (
          <Text style={styles.submitButtonText}>Đăng nhập</Text>
        )}
      </TouchableOpacity>

      {/* Phân cách LOGIN.OR */}
      <View style={styles.orDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>LOGIN.OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Nút sinh trắc học Face ID / Vân tay */}
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isLoading}
        style={styles.biometricButton}
        onPress={onBiometricLogin}
      >
        <UserIcon color={Colors.palette.slate[700]} size={16} />
        <Text style={styles.biometricText}>Dùng Face ID / Vân tay</Text>
      </TouchableOpacity>

      {/* Ghi chú bảo mật Keychain/Keystore (SEC-002) */}
      <View style={styles.footerNoteWrap}>
        <Text style={styles.footerNote}>
          Mật khẩu lưu trong Keychain / Keystore. Không ghi log.
        </Text>
      </View>

      {/* Link chuyển sang đăng ký tài khoản */}
      <View style={styles.switchTabRow}>
        <Text style={styles.switchTabText}>Chưa có tài khoản? </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onSwitchToRegister}>
          <Text style={styles.switchTabLink}>Tạo tài khoản mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: spacing.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: 2,
  },
  rememberWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rememberLabel: {
    ...Typography.caption,
    fontSize: 13,
    color: Colors.palette.slate[700],
    fontWeight: '400',
  },
  forgotText: {
    ...Typography.caption,
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
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
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.palette.slate[200],
  },
  orText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.palette.slate[400],
    letterSpacing: 2,
    paddingHorizontal: spacing.md,
  },
  biometricButton: {
    width: '100%',
    minHeight: 48,
    backgroundColor: Colors.palette.slate[50],
    borderWidth: 1.2,
    borderColor: Colors.palette.slate[200],
    borderRadius: radius.md + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg + 2,
  },
  biometricText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.palette.slate[800],
  },
  footerNoteWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  footerNote: {
    fontSize: 11,
    color: Colors.palette.slate[400],
    textAlign: 'center',
    lineHeight: 16,
  },
  switchTabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  switchTabText: {
    fontSize: 13,
    color: Colors.palette.slate[600],
  },
  switchTabLink: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  errorBanner: {
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
  errorBannerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.danger,
    lineHeight: 18,
    fontWeight: '500',
  },
});

export default LoginForm;
