/**
 * @file useCameras.ts
 * @desc Hook quản lý nghiệp vụ Camera, cầu nối giữa UI và Store/Services
 * @layer modules/camera/hooks
 */

import { useCameraStore } from '../store/camera.store';
import { CameraInput } from '@/shared/types';

export const useCameras = () => {
  const {
    cameras,
    selectedCamera,
    loading,
    loadCameras,
    selectCamera,
    saveCamera,
    deleteCamera,
    resetAll,
  } = useCameraStore();

  const handleCreateOrUpdate = async (input: CameraInput, existingId?: string) => {
    return await saveCamera(input, existingId);
  };

  const handleRemove = async (id: string) => {
    return await deleteCamera(id);
  };

  const handleRefresh = async () => {
    await loadCameras();
  };

  return {
    cameras,
    selectedCamera,
    loading,
    selectCamera,
    saveCamera: handleCreateOrUpdate,
    deleteCamera: handleRemove,
    refreshCameras: handleRefresh,
    resetAllCameras: resetAll,
  };
};

export default useCameras;

