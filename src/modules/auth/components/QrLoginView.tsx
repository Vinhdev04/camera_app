/**
 * @file QrLoginView.tsx
 * @desc Component Đăng nhập nhanh bằng Mã QR (QR Code Authorization)
 * Thiết kế Viewfinder công nghệ cao, vạch quét Animated Radar và xử lý 404/Expired State
 * @layer modules/auth/components
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { radius, spacing } from '@/shared/styles/tokens';
import { AlertIcon, CheckIcon, QrIcon } from './CleanIcons';

export interface QrLoginViewProps {
  onQrLoginSuccess: (tokenData: any) => void;
  onSwitchToAccount: () => void;
}

export const QrLoginView: React.FC<QrLoginViewProps> = ({
  onQrLoginSuccess,
  onSwitchToAccount,
}) => {
  const [scanStatus, setScanStatus] = useState<'scanning' | 'verifying' | 'success' | 'expired'>('scanning');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hiệu ứng tia quét laser chạy lên xuống
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loopAnimation: Animated.CompositeAnimation | null = null;

    if (scanStatus === 'scanning') {
      scanLineAnim.setValue(0);
      loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 190,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 1600,
            useNativeDriver: true,
          }),
        ])
      );
      loopAnimation.start();
    }

    return () => {
      if (loopAnimation) loopAnimation.stop();
    };
  }, [scanStatus, scanLineAnim]);

  // Giả lập hành động quét thành công
  const handleSimulateScanSuccess = () => {
    setScanStatus('verifying');
    setErrorMessage(null);

    setTimeout(() => {
      setScanStatus('success');
      setTimeout(() => {
        onQrLoginSuccess({ token: 'qr_auth_991823', type: 'session' });
      }, 800);
    }, 1000);
  };

  // Giả lập tình huống mã QR bị hết hạn (404 / Expired error state)
  const handleSimulateScanExpired = () => {
    setScanStatus('verifying');
    setErrorMessage(null);

    setTimeout(() => {
      setScanStatus('expired');
      setErrorMessage('Mã QR đã hết hạn hoặc phiên xác thực không tồn tại (Lỗi 404). Vui lòng làm mới mã trên màn hình nguồn.');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Khung Viewfinder quét QR */}
      <View style={styles.viewfinderFrame}>
        {/* 4 Góc khung định vị công nghệ */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />

        {scanStatus === 'scanning' && (
          <>
            {/* Tia quét Laser Animated */}
            <Animated.View
              style={[
                styles.laserLine,
                { transform: [{ translateY: scanLineAnim }] },
              ]}
            />
            {/* Biểu tượng QR mờ ở tâm */}
            <View style={styles.centerQrIcon}>
              <QrIcon color={Colors.palette.slate[300]} size={64} />
            </View>
          </>
        )}

        {scanStatus === 'verifying' && (
          <View style={styles.statusOverlay}>
            <ActivityIndicator color={Colors.primary} size="large" />
            <Text style={styles.verifyingText}>Đang kiểm tra mã QR...</Text>
          </View>
        )}

        {scanStatus === 'success' && (
          <View style={styles.statusOverlay}>
            <CheckIcon color={Colors.success} size={48} />
            <Text style={styles.successText}>Xác thực thành công!</Text>
          </View>
        )}

        {scanStatus === 'expired' && (
          <View style={styles.statusOverlay}>
            <AlertIcon color={Colors.danger} size={44} />
            <Text style={styles.expiredTitle}>Mã không hợp lệ</Text>
            <Text style={styles.expiredSub}>404 Expired Session</Text>
          </View>
        )}
      </View>

      {/* Thông báo lỗi nếu có */}
      {Boolean(errorMessage) && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {/* Hướng dẫn thao tác */}
      <Text style={styles.instructionTitle}>Quét mã QR từ máy tính hoặc camera</Text>
      <Text style={styles.instructionBody}>
        Mở cổng quản lý UICV Web hoặc menu Cài đặt trên ứng dụng nguồn để quét mã đăng nhập tức thì không cần nhập mật khẩu.
      </Text>

      {/* Cụm nút hành động giả lập & quét lại */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.primaryActionButton}
          onPress={handleSimulateScanSuccess}
        >
          <Text style={styles.primaryActionText}>Quét mã mẫu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.secondaryActionButton}
          onPress={handleSimulateScanExpired}
        >
          <Text style={styles.secondaryActionText}>Thử lỗi 404</Text>
        </TouchableOpacity>
      </View>

      {/* Link chuyển về Đăng nhập bằng tài khoản */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.switchAuthModeBtn}
        onPress={onSwitchToAccount}
      >
        <Text style={styles.switchAuthModeText}>
          Hoặc đăng nhập bằng <Text style={styles.highlightText}>Tài khoản email</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  viewfinderFrame: {
    width: 210,
    height: 210,
    backgroundColor: Colors.palette.slate[50],
    borderRadius: radius.md + 4,
    borderWidth: 1,
    borderColor: Colors.palette.slate[200],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  corner: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderColor: Colors.primary,
  },
  cornerTL: {
    top: 6,
    left: 6,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    top: 6,
    right: 6,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    bottom: 6,
    left: 6,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    bottom: 6,
    right: 6,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 4,
  },
  laserLine: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 8,
    height: 2,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  centerQrIcon: {
    opacity: 0.35,
  },
  statusOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    zIndex: 20,
  },
  verifyingText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.palette.slate[800],
    marginTop: spacing.sm,
  },
  successText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.success,
    marginTop: spacing.sm,
  },
  expiredTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.danger,
    marginTop: spacing.sm,
  },
  expiredSub: {
    fontSize: 11,
    color: Colors.palette.slate[500],
    marginTop: 2,
  },
  errorBox: {
    width: '100%',
    backgroundColor: Colors.palette.red[50],
    borderWidth: 1,
    borderColor: Colors.palette.red[200],
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  errorText: {
    fontSize: 12,
    color: Colors.danger,
    lineHeight: 18,
    textAlign: 'center',
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.palette.slate[900],
    textAlign: 'center',
    marginBottom: 6,
  },
  instructionBody: {
    fontSize: 13,
    color: Colors.palette.slate[600],
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xl,
  },
  actionButtonsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  primaryActionButton: {
    flex: 1,
    minHeight: 46,
    backgroundColor: Colors.primary,
    borderRadius: radius.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  secondaryActionButton: {
    flex: 1,
    minHeight: 46,
    backgroundColor: Colors.palette.slate[100],
    borderWidth: 1,
    borderColor: Colors.palette.slate[200],
    borderRadius: radius.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.palette.slate[700],
  },
  switchAuthModeBtn: {
    paddingVertical: spacing.sm,
  },
  switchAuthModeText: {
    fontSize: 13,
    color: Colors.palette.slate[600],
  },
  highlightText: {
    fontWeight: '700',
    color: Colors.primary,
  },
});

export default QrLoginView;
