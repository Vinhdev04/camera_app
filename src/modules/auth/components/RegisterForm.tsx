/**
 * @file RegisterForm.tsx
 * @desc Form tạo tài khoản UICV mới đồng bộ cấu hình đám mây
 * @layer modules/auth/components
 */

import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Button, Input } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { RegisterCredentials } from '../types';
import { styles } from './RegisterForm.styles';

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

export default RegisterForm;
