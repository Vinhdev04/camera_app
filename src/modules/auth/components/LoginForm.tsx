/**
 * @file LoginForm.tsx
 * @desc Component Form Đăng nhập theo sát thiết kế SCR-11 (Light Tech System)
 * @layer modules/auth/components
 */

import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Button, Input } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { LoginCredentials } from '../types';
import { styles } from './LoginForm.styles';

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
          <Text style={styles.errorBannerText}>{errorMessage}</Text>
        </View>
      )}

      {/* Trường nhập Email */}
      <Input
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email *"
        placeholder="an.nguyen@vidu.com"
        value={email}
        onChangeText={setEmail}
      />

      {/* Trường nhập Mật khẩu */}
      <Input
        isPassword
        label="Mật khẩu *"
        placeholder="Tối thiểu 8 ký tự"
        value={password}
        onChangeText={setPassword}
      />

      {/* Hàng tùy chọn Ghi nhớ & Quên mật khẩu */}
      <View style={styles.optionsRow}>
        <View style={styles.rememberWrap}>
          <Switch
            thumbColor={Colors.white}
            trackColor={{
              false: Colors.border,
              true: Colors.primary,
            }}
            value={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text style={styles.rememberLabel}>Ghi nhớ đăng nhập</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.forgotBtn}
          onPress={onForgotPassword}
        >
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      {/* Nút bấm chính Đăng nhập */}
      <Button
        disabled={isLoading}
        loading={isLoading}
        style={styles.submitBtn}
        title="Đăng nhập"
        variant="primary"
        onPress={handleSubmit}
      />

      {/* Vạch kẻ chia cắt LOGIN.OR */}
      <View style={styles.orDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>LOGIN.OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Nút đăng nhập sinh trắc học */}
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isLoading}
        style={styles.biometricBtn}
        onPress={onBiometricLogin}
      >
        <Text style={styles.biometricIcon}>🪪</Text>
        <Text style={styles.biometricText}>Dùng Face ID / Vân tay</Text>
      </TouchableOpacity>

      {/* Chú thích bảo mật chuẩn SEC-002 */}
      <View style={styles.footerNoteWrap}>
        <Text style={styles.footerNote}>
          Mật khẩu lưu trong Keychain / Keystore. Không ghi log.
        </Text>
      </View>

      {/* Liên kết chuyển sang tạo tài khoản */}
      <View style={styles.switchTabWrap}>
        <Text style={styles.switchTabText}>Chưa có tài khoản?</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onSwitchToRegister}>
          <Text style={styles.switchTabLink}>Tạo tài khoản mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
