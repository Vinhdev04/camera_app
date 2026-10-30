/**
 * @file theme.ts
 * @desc Định nghĩa Theme tổng thể cho ứng dụng
 * @layer shared/styles
 */

import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, spacing } from './tokens';

export const THEME = {
  colors: Colors,
  typography: Typography,
  spacing,
  radius,
};

export default THEME;
