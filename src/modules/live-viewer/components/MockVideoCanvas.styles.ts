/**
 * @file MockVideoCanvas.styles.ts
 * @desc Styles cho MockVideoCanvas giả lập trình phát camera
 * @layer modules/live-viewer/components
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { radius } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#05070D',
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#070C18',
    opacity: 0.9,
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    zIndex: 10,
  },
  statusMsg: {
    ...Typography.caption,
    color: Colors.textPrimary,
    marginTop: 8,
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  osdTop: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    zIndex: 5,
  },
  osdText: {
    ...Typography.caption,
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  osdBottom: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    zIndex: 5,
  },
  qualityPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  qualityText: {
    ...Typography.caption,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  statsText: {
    ...Typography.caption,
    color: '#94A3B8',
    fontSize: 10,
  },
});

export default styles;

