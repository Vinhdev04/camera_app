/**
 * @file Typography.ts
 * @desc Hệ thống phân cấp Typography của ứng dụng UICV Camera
 * Đồng bộ với Design Tokens và UI Prototype
 * @layer shared/constants
 */

import { typography as uiKitTypography } from '@/shared/styles/tokens';

export const Typography = {
  ...uiKitTypography,

  // Thang kích thước chữ (Font Sizes)
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },

  // Độ đậm của chữ (Font Weights)
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Chiều cao dòng (Line Heights)
  lineHeight: {
    xs: 14,
    sm: 16,
    base: 20,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 38,
  },

  // Font gia đình (Font Families)
  fontFamily: {
    sans: 'System',
    mono: 'monospace',
  },
};

export default Typography;
