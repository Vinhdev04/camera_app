/**
 * @file Config.ts
 * @desc Các cấu hình hệ thống, timeout, port mặc định và presets hãng camera
 * @layer constants
 */

export const AppConfig = {
  appName: 'Universal IP Camera Viewer',
  appVersion: '1.0.0',
  defaultRtspPort: 554,
  connectionTimeoutMs: 5000,
  maxMultiViewCameras: 4,

  // Presets thông dụng theo hãng (BR-U05)
  cameraPresets: {
    yoosee: {
      name: 'Yoosee',
      port: 554,
      mainPath: '/onvif1',
      subPath: '/onvif2',
    },
    imou: {
      name: 'Imou / Dahua',
      port: 554,
      mainPath: '/cam/realmonitor?channel=1&subtype=0',
      subPath: '/cam/realmonitor?channel=1&subtype=1',
    },
    hikvision: {
      name: 'Hikvision',
      port: 554,
      mainPath: '/Streaming/Channels/101',
      subPath: '/Streaming/Channels/102',
    },
    generic: {
      name: 'Chung (Generic RTSP)',
      port: 554,
      mainPath: '/live/ch0',
      subPath: '/live/ch1',
    },
  },
};

export default AppConfig;
