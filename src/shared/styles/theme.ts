/**
 * @file theme.ts
 * @desc Định nghĩa Theme tổng thể cho ứng dụng UICV Camera (Light Tech & Dark Mode)
 * Hỗ trợ chuyển đổi Theme linh hoạt theo cài đặt tại SCR-10
 * @layer shared/styles
 */

import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import {
  lightColors,
  darkColors,
  spacing,
  radius,
  shadows,
  cameraStatusTokens,
} from './tokens';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppTheme {
  mode: 'light' | 'dark';
  colors: typeof lightColors;
  typography: typeof Typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  status: typeof cameraStatusTokens;
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: lightColors,
  typography: Typography,
  spacing,
  radius,
  shadows,
  status: cameraStatusTokens,
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: darkColors,
  typography: Typography,
  spacing,
  radius,
  shadows,
  status: cameraStatusTokens,
};

export const THEME = {
  colors: Colors,
  typography: Typography,
  spacing,
  radius,
  shadows,
  light: lightTheme,
  dark: darkTheme,
};

export default THEME;
