/**
 * @file RegisterForm.tsx
 * @desc Component UI Form tạo tài khoản UICV mới
 * @layer modules/auth/components
 */

import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Input } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';
import { RegisterCredentials } from '../types';

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
      {/* Banner báo lỗi */}
      {Boolean(errorMessage) && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{errorMessage}</Text>
        </View>
      )}

      {/* Họ tên */}
      <Input
        label="Họ và tên *"
        placeholder="Nguyễn Văn A"
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <Input
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email *"
        placeholder="an.nguyen@vidu.com"
        value={email}
        onChangeText={setEmail}
      />

      {/* Mật khẩu */}
      <Input
        isPassword
        helperText="Tối thiểu 8 ký tự bao gồm chữ và số"
        label="Mật khẩu *"
        placeholder="Tối thiểu 8 ký tự"
        value={password}
        onChangeText={setPassword}
      />

      {/* Xác nhận mật khẩu */}
      <Input
        isPassword
        label="Xác nhận mật khẩu *"
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Điều khoản */}
      <View style={styles.termsRow}>
        <Switch
          thumbColor={Colors.white}
          trackColor={{
            false: Colors.border,
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

      {/* Nút bấm chính */}
      <Button
        disabled={isLoading}
        loading={isLoading}
        style={styles.submitBtn}
        title="Đăng ký tài khoản"
        variant="primary"
        onPress={handleSubmit}
      />

      {/* Chuyển sang màn đăng nhập */}
      <View style={styles.switchTabWrap}>
        <Text style={styles.switchTabText}>Đã có tài khoản?</Text>
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
    marginTop: spacing.md,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    marginTop: -spacing.xs,
  },
  termsTextWrap: {
    flex: 1,
  },
  termsText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  submitBtn: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  switchTabWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  switchTabText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  switchTabLink: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  errorBanner: {
    backgroundColor: Colors.dangerSubtle || 'rgba(239, 68, 68, 0.1)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.borderError,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorBannerText: {
    ...Typography.caption,
    color: Colors.danger,
    lineHeight: 18,
  },
});

export default RegisterForm;
