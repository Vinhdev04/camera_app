/**
 * @file multiView.service.ts
 * @desc Service tính toán layout và giới hạn camera cho lưới đa màn hình
 * @layer modules/multi-view/services
 */

import { Camera } from '@/shared/types';
import { AppConfig } from '@/shared/constants/Config';

export const filterGridCamerasApi = (cameras: Camera[]): Camera[] => {
  return cameras.slice(0, AppConfig.maxMultiViewCameras);
};

