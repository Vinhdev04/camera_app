/**
 * @file useMultiView.ts
 * @desc Hook quản lý hiển thị lưới đa camera 2x2
 * @layer modules/multi-view/hooks
 */

import { useMemo } from 'react';
import { useCameras } from '@/modules/camera/hooks/useCameras';
import * as multiViewService from '../services/multiView.service';

export const useMultiView = () => {
  const { cameras, selectCamera } = useCameras();

  const gridCameras = useMemo(() => {
    return multiViewService.filterGridCamerasApi(cameras);
  }, [cameras]);

  return {
    gridCameras,
    totalCameras: cameras.length,
    selectCamera,
  };
};

export default useMultiView;

