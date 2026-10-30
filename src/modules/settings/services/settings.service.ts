/**
 * @file settings.service.ts
 * @desc Service lưu trữ tuỳ chọn cài đặt và reset dữ liệu
 * @layer modules/settings/services
 */

import { AppSettings } from '../types';
import { resetAllCamerasApi } from '@/modules/camera/services/camera.service';

export const saveSettingsApi = async (settings: Partial<AppSettings>): Promise<void> => {
  // Giả lập lưu vào AsyncStorage / SecureStore
  await new Promise((res) => setTimeout(res, 50));
};

export const clearAllAppDataApi = async (): Promise<void> => {
  // Gọi API xoá toàn bộ danh sách camera và cấu hình
  await resetAllCamerasApi();
};

