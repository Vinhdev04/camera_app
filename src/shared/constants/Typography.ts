/**
 * @file Typography.ts
 * @desc Hệ thống phân cấp Typography của ứng dụng UICV Camera
 * @layer shared/constants
 */

import { typography as uiKitTypography } from '@/shared/styles/tokens';

export const Typography = {
  ...uiKitTypography,
  fontSize: {
    xs: 11,
    sm: 13,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export default Typography;
