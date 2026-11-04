/**
 * @file Colors.ts
 * @desc Bảng màu chính thức của ứng dụng UICV Camera
 * Đồng bộ với Design Tokens và UI Prototype (Light Tech System & Dark Mode)
 * @layer shared/constants
 */

import {
  colors as uiKitColors,
  lightColors,
  darkColors,
  palette,
  cameraStatusTokens,
} from '@/shared/styles/tokens';

export const Colors = {
  // Kế thừa toàn bộ semantic tokens mặc định (Light Tech)
  ...uiKitColors,

  // Palette gốc
  palette,
  light: lightColors,
  dark: darkColors,
  status: cameraStatusTokens,

  // Màu cơ bản
  white: palette.white,
  black: palette.black,
  transparent: palette.transparent,
  overlay: 'rgba(0, 0, 0, 0.6)',
  videoOverlay: 'rgba(15, 23, 42, 0.85)',

  // Viền bổ trợ tương thích ngược
  borderLight: palette.slate[200],
  primaryLight: palette.red[500],

  // Thành phần giao diện đặc trưng theo mockup
  cardBg: lightColors.surface,
  activeTab: lightColors.primary,
  inactiveTab: palette.slate[400],
  tabBarBg: palette.white,
  tabBarBorder: palette.slate[200],

  // Chip & Badge
  chipBg: palette.slate[100],
  chipBorder: palette.slate[200],
  chipActiveBg: palette.slate[900],
  chipActiveText: palette.white,

  // Gợi ý Preset & LAN Chip
  presetBg: palette.slate[100],
  presetBorder: palette.slate[200],
  presetText: palette.slate[700],
  lanChipBg: palette.slate[100],
  lanChipText: palette.slate[700],

  // Nút hành động nổi bật (FAB / "+")
  fabBg: lightColors.primary,
  fabText: palette.white,

  // Nút phụ / Action tile
  actionTileBg: palette.white,
  actionTileBorder: palette.slate[200],
  actionTileText: palette.slate[700],

  // Khung phát video
  videoBackground: palette.slate[900],
  videoFrameBorder: palette.slate[800],
};

export default Colors;
