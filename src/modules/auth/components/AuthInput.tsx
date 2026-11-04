/**
 * @file AuthInput.tsx
 * @desc Component Input chuyên dụng cho các form Xác thực (Đăng nhập / Đăng ký)
 * Tối ưu responsive, chuẩn xác theo bản thiết kế SCR-11
 * @layer modules/auth/components
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from '@/shared/styles/tokens';

export interface AuthInputProps extends TextInputProps {
  label: string;
  isRequired?: boolean;
  error?: string;
  helperText?: string;
  isPassword?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  isRequired = false,
  error,
  helperText,
  isPassword = false,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label hàng trên kèm nút Show/Hide nếu là mật khẩu */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {isRequired && <Text style={styles.requiredStar}> *</Text>}
        </Text>

        {isPassword && (
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
            style={styles.toggleShowBtn}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️'}</Text>
            <Text style={styles.toggleShowText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Ô nhập liệu chuẩn thiết kế */}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          Boolean(error) && styles.inputError,
        ]}
      >
        <TextInput
          placeholderTextColor={Colors.palette.slate[400]}
          secureTextEntry={isPassword && !showPassword}
          style={[styles.inputField, style]}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
      </View>

      {/* Thông báo lỗi hoặc gợi ý */}
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
      {!error && Boolean(helperText) && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md + 2,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  label: {
    ...Typography.bodyMedium,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.palette.slate[800],
  },
  requiredStar: {
    color: Colors.primary,
    fontWeight: '700',
  },
  toggleShowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eyeIcon: {
    fontSize: 13,
  },
  toggleShowText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  inputWrapper: {
    width: '100%',
    minHeight: 50,
    backgroundColor: Colors.palette.slate[100],
    borderRadius: radius.md + 2,
    borderWidth: 1.2,
    borderColor: Colors.palette.slate[200],
    justifyContent: 'center',
    paddingHorizontal: spacing.md + 2,
  },
  inputFocused: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    backgroundColor: Colors.palette.red[50],
    borderColor: Colors.danger,
  },
  inputField: {
    fontSize: 15,
    color: Colors.palette.slate[900],
    fontWeight: '400',
    paddingVertical: spacing.sm,
  },
  errorText: {
    fontSize: 12,
    color: Colors.danger,
    marginTop: 4,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: Colors.palette.slate[500],
    marginTop: 4,
  },
});

export default AuthInput;
