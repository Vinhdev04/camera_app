/**
 * @file onboarding.service.ts
 * @desc Service cung cấp nội dung giới thiệu LAN-first và quyền riêng tư
 * @layer modules/onboarding/services
 */

import { OnboardingSlide } from '../types';

export const fetchOnboardingSlidesApi = (): OnboardingSlide[] => {
  return [
    {
      icon: '🛡️',
      title: 'Giám sát LAN-First An toàn',
      description:
        'Kết nối trực tiếp tới Camera IP trong mạng Wi-Fi gia đình. Dữ liệu video không đi qua bất kỳ máy chủ đám mây nào, bảo vệ 100% sự riêng tư.',
    },
    {
      icon: '⚖️',
      title: 'Cam kết Pháp lý & Sở hữu',
      description:
        'Theo quy chuẩn an ninh, bạn chỉ được phép kết nối và giám sát các thiết bị camera thuộc quyền sở hữu hợp pháp hoặc được ủy quyền quản trị.',
    },
    {
      icon: '📡',
      title: 'Khám phá Mạng Cục bộ',
      description:
        'Ứng dụng cần quyền Local Network để tự động quét cổng RTSP và nhận dạng camera trong cùng dải mạng nội bộ.',
    },
  ];
};

