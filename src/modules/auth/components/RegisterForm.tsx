/**
 * @file RegisterForm.tsx
 * @desc Component Form Đăng ký tài khoản UICV mới
 * @layer modules/auth/components
 */

import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { radius, spacing } from '@/shared/styles/tokens';
import { RegisterCredentials } from '../types';
import { AuthInput } from './AuthInput';

export interface RegisterFormProps {
  isLoading: boolean;
  errorMessage: string | null;
  onSubmit: (credentials: RegisterCredentials) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  isLoading,
  errorMessage,
  onSubmit,
  onSwitchToLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  const handleSubmit = () => {
    onSubmit({
      name,
      email,
      password,
      confirmPassword,
      agreeToTerms,
    });
  };

  return (
    <View style={styles.container}>
      {/* Banner thông báo lỗi nếu có */}
      {Boolean(errorMessage) && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerIcon}>⚠️</Text>
          <Text style={styles.errorBannerText}>{errorMessage}</Text>
        </View>
      )}

      {/* Họ tên */}
      <AuthInput
        isRequired
        label="Họ và tên"
        placeholder="Nguyễn Văn A"
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <AuthInput
        autoCapitalize="none"
        isRequired
        keyboardType="email-address"
        label="Email"
        placeholder="an.nguyen@vidu.com"
        value={email}
        onChangeText={setEmail}
      />

      {/* Mật khẩu */}
      <AuthInput
        isPassword
        isRequired
        label="Mật khẩu"
        placeholder="Tối thiểu 8 ký tự"
        value={password}
        onChangeText={setPassword}
      />

      {/* Xác nhận mật khẩu */}
      <AuthInput
        isPassword
        isRequired
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Switch điều khoản dịch vụ */}
      <View style={styles.termsRow}>
        <Switch
          ios_backgroundColor={Colors.palette.slate[200]}
          style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          thumbColor={Colors.white}
          trackColor={{
            false: Colors.palette.slate[200],
            true: Colors.primary,
          }}
          value={agreeToTerms}
          onValueChange={setAgreeToTerms}
        />
        <View style={styles.termsTextWrap}>
          <Text style={styles.termsText}>
            Tôi đồng ý với{' '}
            <Text style={styles.termsLink}>Điều khoản dịch vụ</Text> và{' '}
            <Text style={styles.termsLink}>Chính sách bảo mật</Text> của UICV.
          </Text>
        </View>
      </View>

      {/* Nút bấm chính: Đăng ký */}
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={isLoading}
        style={[styles.submitButton, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Đang khởi tạo tài khoản...' : 'Đăng ký tài khoản'}
        </Text>
      </TouchableOpacity>

      {/* Link quay lại màn hình đăng nhập */}
      <View style={styles.switchTabRow}>
        <Text style={styles.switchTabText}>Đã có tài khoản? </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onSwitchToLogin}>
          <Text style={styles.switchTabLink}>Đăng nhập ngay</Text>
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.lg,
    marginTop: 2,
  },
  termsTextWrap: {
    flex: 1,
  },
  termsText: {
    fontSize: 12,
    color: Colors.palette.slate[600],
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    width: '100%',
    minHeight: 50,
    backgroundColor: Colors.primary,
    borderRadius: radius.md + 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
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
  switchTabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    marginBottom: spacing.lg,
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
});

export default RegisterForm;
