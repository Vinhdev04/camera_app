/**
 * @file Colors.ts
 * @desc Bảng màu chủ đạo của ứng dụng UICV Camera
 * @layer shared/constants
 */

import { colors as uiKitColors } from '@/shared/styles/tokens';

export const Colors = {
  ...uiKitColors,
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.7)',
  cardBg: uiKitColors.surface,
  activeTab: uiKitColors.primary,
  inactiveTab: uiKitColors.textSecondary,
};

export default Colors;
