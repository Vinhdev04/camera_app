/**
 * @file liveStream.service.ts
 * @desc Service tương tác và gửi lệnh điều khiển luồng RTSP / ONVIF
 * @layer modules/live-viewer/services
 */

import { PtzDirection } from '../types';

export const sendPtzCommandApi = async (cameraId: string, direction: PtzDirection): Promise<boolean> => {
  // Giả lập gửi lệnh SOAP ONVIF PTZ tới camera
  await new Promise((res) => setTimeout(res, 50));
  return true;
};

export const captureSnapshotApi = async (cameraId: string): Promise<string> => {
  // Giả lập chụp khung hình hiện tại và lưu vào thư viện
  await new Promise((res) => setTimeout(res, 100));
  return new Date().toLocaleTimeString();
};

