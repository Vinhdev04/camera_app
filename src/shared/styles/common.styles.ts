/**
 * @file common.styles.ts
 * @desc Tập hợp các StyleSheet dùng chung chuẩn mực cho toàn ứng dụng UICV Camera
 * Thiết kế chuẩn theo phong cách Light Tech System & Dark Surveillance từ bộ 22 màn hình UI Mockup
 * @layer shared/styles
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius, shadows, spacing } from './tokens';

export const commonStyles = StyleSheet.create({
  // 1. Khung chứa màn hình (Screen Layouts)
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 2. Header chuẩn
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerEyebrow: {
    ...Typography.eyebrow,
    marginBottom: spacing.xxs,
  },
  headerTitle: {
    ...Typography.titleLg,
  },
  headerSubtitle: {
    ...Typography.caption,
    marginTop: 2,
    color: Colors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  // 3. Khung thẻ (Cards & Containers)
  card: {
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardSubtle: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderColor: Colors.borderSubtle,
  },

  // 4. Flex Utility Rows & Centers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 5. Trạng thái & Chấm tín hiệu (Status & Indicators)
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    marginRight: spacing.xs,
  },
  statusDotOnline: {
    backgroundColor: Colors.success,
  },
  statusDotWarning: {
    backgroundColor: Colors.warning,
  },
  statusDotDanger: {
    backgroundColor: Colors.danger,
  },
  statusDotOffline: {
    backgroundColor: Colors.offline,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radius.full,
  },

  // 6. Nhãn thông số (Chips & Tags: Codec, 1080p, Preset, LAN)
  tagChip: {
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.xs,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    marginRight: spacing.xs,
  },
  tagChipText: {
    ...Typography.mono,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  lanBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: spacing.md,
  },

  // 7. Segment Toggle (VD: Sub / Main, Sáng / Tối)
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: radius.md,
    padding: spacing.xxs,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  segmentItemActive: {
    backgroundColor: Colors.chipActiveBg,
  },
  segmentText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
  segmentTextActive: {
    ...Typography.bodyBold,
    color: Colors.chipActiveText,
  },

  // 8. Nút bấm hình tròn nổi (Floating / Circular Action Button)
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.fabBg,
    ...shadows.md,
  },
  circleBtnText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 22,
  },

  // 9. Video Container & Controls Overlay
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: Colors.videoBackground,
    borderRadius: radius.lg,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoOverlayBar: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // 10. Đường kẻ phân tách (Dividers)
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: spacing.md,
  },
  dividerSubtle: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: spacing.sm,
  },
});

export default commonStyles;

