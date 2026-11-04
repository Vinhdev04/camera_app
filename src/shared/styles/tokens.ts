/**
 * @file tokens.ts
 * @desc Hệ thống Design Tokens chuẩn hóa cho UICV Camera (Universal IP Camera Viewer)
 * Khớp 100% với bản đặc tả UI/UX SRS và bộ mockup 22 màn hình (Light Tech System & Dark Surveillance)
 * @layer shared/styles
 */

import { TextStyle, ViewStyle } from 'react-native';

/**
 * 1. Bảng màu nền tảng (Foundation Palette)
 */
export const palette = {
  // Brand Red - Màu chủ đạo đặc trưng camera UICV (REC, Primary Action, Active Indicator)
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626', // Màu đỏ chính trong prototype
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  // Rose / Crimson - Dùng cho Eyebrow overline
  rose: {
    500: '#F43F5E',
    600: '#E11D48',
  },
  // Tech Blue / Sky - Dùng cho Highlight LAN, Discovery, Diagnostics
  sky: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
  },
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
  },
  // Surveillance Emerald - Trực tuyến / ONVIF Verified
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },
  // Amber - Đang kết nối / Buffering
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    400: '#FBBF24',
    500: '#F59E0B',
    700: '#B45309',
  },
  // Slate Neutral - Thang màu giao diện chuẩn công nghệ cao
  slate: {
    50: '#F8FAFC',  // Nền sáng app
    100: '#F1F5F9', // Nền thẻ phụ / Input
    200: '#E2E8F0', // Đường viền chuẩn
    300: '#CBD5E1', // Đường viền đậm
    400: '#94A3B8', // Text muted / Offline
    500: '#64748B', // Text secondary
    600: '#475569',
    700: '#334155',
    800: '#1E293B', // Nền segment active
    900: '#0F172A', // Text chính / Nền video surface
    950: '#020617', // Nền đêm sâu
  },
  // Pure
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

/**
 * 2. Giao diện Sáng (Light Tech System) - Mặc định theo Prototype UI 22 màn hình
 */
export const lightColors = {
  // Nền & Khung chứa (Surfaces)
  background: palette.slate[50],          // #F8FAFC
  surface: palette.white,                 // #FFFFFF
  surfaceElevated: palette.white,
  surfaceSubtle: palette.slate[100],      // #F1F5F9
  surfaceCard: palette.white,
  surfaceActive: palette.slate[900],      // #0F172A (Segment đã chọn)

  // Viền & Ngăn cách (Borders)
  border: palette.slate[200],             // #E2E8F0
  borderSubtle: palette.slate[100],       // #F1F5F9
  borderFocus: palette.red[600],          // #DC2626
  borderError: palette.red[500],          // #EF4444

  // Chữ & Biểu tượng (Typography & Icons)
  textPrimary: palette.slate[900],        // #0F172A
  textSecondary: palette.slate[600],      // #475569
  textMuted: palette.slate[400],          // #94A3B8
  textInverse: palette.white,
  textBrand: palette.red[600],            // #DC2626
  textOverline: palette.rose[600],        // #E11D48

  // Nhận diện & Hành động chính (Brand & Primary Action)
  primary: palette.red[600],              // #DC2626 (Nút đỏ "+", "Lưu camera", "Bản ghi")
  primaryHover: palette.red[700],         // #B91C1C
  primarySubtle: palette.red[50],         // #FEF2F2
  primaryLight: palette.red[500],

  // Thông tin & LAN Highlight
  info: palette.sky[600],
  infoSubtle: palette.sky[50],

  // Trạng thái camera (Semantics)
  success: palette.emerald[500],          // #10B981 (Trực tuyến)
  successSubtle: palette.emerald[50],     // #ECFDF5
  successText: palette.emerald[700],      // #047857

  warning: palette.amber[500],            // #F59E0B (Đang kết nối)
  warningSubtle: palette.amber[50],       // #FFFBEB
  warningText: palette.amber[700],        // #B45309

  danger: palette.red[500],               // #EF4444 (Sai xác thực / Lỗi)
  dangerSubtle: palette.red[50],          // #FEF2F2
  dangerText: palette.red[700],           // #B91C1C

  offline: palette.slate[400],            // #94A3B8 (Ngoại tuyến)
  offlineSubtle: palette.slate[100],      // #F1F5F9
  offlineText: palette.slate[600],        // #475569

  // Video Player Surface (Khu vực xem video luôn giữ nền tối)
  videoSurface: palette.slate[900],
  videoOverlay: 'rgba(15, 23, 42, 0.75)',
  videoPill: 'rgba(0, 0, 0, 0.65)',
};

/**
 * 3. Giao diện Tối (Dark Surveillance Mode) - Cho môi trường giám sát ban đêm
 */
export const darkColors = {
  // Nền & Khung chứa
  background: '#090D16',
  surface: '#111827',
  surfaceElevated: '#1F2937',
  surfaceSubtle: '#151D2C',
  surfaceCard: '#111827',
  surfaceActive: '#374151',

  // Viền
  border: '#2A3649',
  borderSubtle: '#1E293B',
  borderFocus: palette.red[500],
  borderError: palette.red[500],

  // Chữ
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textInverse: '#111827',
  textBrand: palette.red[500],
  textOverline: palette.rose[500],

  // Nhận diện
  primary: palette.red[600],
  primaryHover: palette.red[500],
  primarySubtle: 'rgba(239, 68, 68, 0.15)',
  primaryLight: palette.red[400],

  // Thông tin & LAN Highlight
  info: palette.sky[400],
  infoSubtle: 'rgba(14, 165, 233, 0.15)',

  // Trạng thái
  success: palette.emerald[500],
  successSubtle: 'rgba(16, 185, 129, 0.15)',
  successText: '#34D399',

  warning: palette.amber[500],
  warningSubtle: 'rgba(245, 158, 11, 0.15)',
  warningText: '#FBBF24',

  danger: palette.red[500],
  dangerSubtle: 'rgba(239, 68, 68, 0.15)',
  dangerText: '#F87171',

  offline: '#6B7280',
  offlineSubtle: 'rgba(107, 114, 128, 0.15)',
  offlineText: '#9CA3AF',

  // Video
  videoSurface: palette.black,
  videoOverlay: 'rgba(0, 0, 0, 0.75)',
  videoPill: 'rgba(0, 0, 0, 0.65)',
};

/**
 * Màu mặc định của ứng dụng (Trỏ tới Light Theme chuẩn theo bản thiết kế prototype)
 */
export const colors = lightColors;

/**
 * 4. Hệ thống Khoảng cách (Spacing 4pt/8pt grid)
 */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

/**
 * 5. Bán kính Bo góc (Radius)
 */
export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
  full: 9999,
};

/**
 * 6. Đổ bóng & Nổi khối (Shadows & Elevation)
 */
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,
  sm: {
    shadowColor: palette.slate[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  } as ViewStyle,
  md: {
    shadowColor: palette.slate[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  } as ViewStyle,
  lg: {
    shadowColor: palette.slate[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,
};

/**
 * 7. Hệ thống Phân cấp Chữ (Typography Scale)
 */
export const typography = {
  // Eyebrow / Overline (như `UNIVERSAL IP CAMERA VIEWER`, `SCR-02`)
  eyebrow: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
    color: colors.textOverline,
  } as TextStyle,

  // Tiêu đề lớn trang chính
  titleLg: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
    color: colors.textPrimary,
  } as TextStyle,

  // Tiêu đề vừa cho Modal / Section
  titleMd: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    color: colors.textPrimary,
  } as TextStyle,

  // Tiêu đề nhỏ / Tên Camera trong thẻ
  titleSm: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    color: colors.textPrimary,
  } as TextStyle,

  // Nội dung thường
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    color: colors.textSecondary,
  } as TextStyle,

  // Nội dung nhấn mạnh vừa
  bodyMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
    color: colors.textPrimary,
  } as TextStyle,

  // Nội dung đậm
  bodyBold: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    color: colors.textPrimary,
  } as TextStyle,

  // Chú thích nhỏ (phút trước, thông số)
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: colors.textMuted,
  } as TextStyle,

  // Chú thích đậm
  captionBold: {
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
    color: colors.textSecondary,
  } as TextStyle,

  // Monospace cho IP, Port, RTSP URL, Ping latency, FPS
  mono: {
    fontSize: 12,
    fontWeight: '500' as const,
    fontFamily: 'monospace',
    lineHeight: 16,
    color: colors.textSecondary,
  } as TextStyle,

  // Nhãn badge (Trực tuyến, H.264, 1080p)
  badge: {
    fontSize: 11,
    fontWeight: '600' as const,
    lineHeight: 14,
  } as TextStyle,
};

/**
 * 8. Trạng thái Camera chuyên dụng
 */
export const cameraStatusTokens = {
  online: {
    label: 'Trực tuyến',
    dotColor: palette.emerald[500],
    textColor: palette.emerald[700],
    bgColor: palette.emerald[50],
  },
  connecting: {
    label: 'Đang nối...',
    dotColor: palette.amber[500],
    textColor: palette.amber[700],
    bgColor: palette.amber[50],
  },
  error: {
    label: 'Sai xác thực',
    dotColor: palette.red[500],
    textColor: palette.red[700],
    bgColor: palette.red[50],
  },
  offline: {
    label: 'Ngoại tuyến',
    dotColor: palette.slate[400],
    textColor: palette.slate[600],
    bgColor: palette.slate[100],
  },
  recording: {
    label: 'REC',
    dotColor: palette.red[600],
    textColor: palette.white,
    bgColor: palette.red[600],
  },
};
