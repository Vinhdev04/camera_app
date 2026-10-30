/**
 * Design Tokens chuyên dụng cho hệ thống giám sát Camera IP (UICV)
 * Bảng màu tối bảo vệ mắt ban đêm và tăng độ tương phản hiển thị video
 */
export const colors = {
  // Nền & Bề mặt (Surfaces)
  background: '#090D16',
  surface: '#111827',
  surfaceElevated: '#1F2937',
  surfaceSubtle: '#151D2C',

  // Viền & Ngăn cách
  border: '#2A3649',
  borderFocus: '#3B82F6',
  borderError: '#EF4444',

  // Chữ & Biểu tượng
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textInverse: '#111827',

  // Nhận diện & Trạng thái (Semantics)
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  success: '#10B981', // Camera Online / Live
  warning: '#F59E0B', // Đang kết nối / Buffering
  danger: '#EF4444',  // Lỗi kết nối / Auth failed / Nút xóa
  offline: '#6B7280', // Camera ngắt kết nối
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
};

export const typography = {
  titleLg: { fontSize: 24, fontWeight: '700' as const, color: colors.textPrimary },
  titleMd: { fontSize: 18, fontWeight: '600' as const, color: colors.textPrimary },
  body: { fontSize: 14, fontWeight: '400' as const, color: colors.textSecondary },
  bodyBold: { fontSize: 14, fontWeight: '600' as const, color: colors.textPrimary },
  caption: { fontSize: 12, fontWeight: '400' as const, color: colors.textMuted },
  badge: { fontSize: 11, fontWeight: '700' as const },
};
