/**
 * @file camera.store.tsx
 * @desc Quản lý state tập trung cho module camera
 * @layer modules/camera/store
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Camera, CameraInput } from '@/shared/types';
import * as cameraService from '../services/camera.service';

interface CameraStoreContextType {
  cameras: Camera[];
  selectedCamera: Camera | null;
  loading: boolean;
  loadCameras: () => Promise<void>;
  selectCamera: (camera: Camera | null) => void;
  saveCamera: (input: CameraInput, existingId?: string) => Promise<Camera>;
  deleteCamera: (id: string) => Promise<boolean>;
  resetAll: () => Promise<void>;
}

const CameraStoreContext = createContext<CameraStoreContextType | undefined>(undefined);

export const CameraStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCameras = useCallback(async () => {
    try {
      setLoading(true);
      const list = await cameraService.fetchCamerasApi();
      setCameras(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCameras();
  }, [loadCameras]);

  const selectCamera = useCallback((camera: Camera | null) => {
    setSelectedCamera(camera);
  }, []);

  const saveCamera = useCallback(
    async (input: CameraInput, existingId?: string): Promise<Camera> => {
      let result: Camera;
      if (existingId) {
        result = await cameraService.updateCameraApi(existingId, input);
      } else {
        result = await cameraService.createCameraApi(input);
      }
      await loadCameras();
      return result;
    },
    [loadCameras]
  );

  const deleteCamera = useCallback(
    async (id: string): Promise<boolean> => {
      const success = await cameraService.deleteCameraApi(id);
      if (selectedCamera?.id === id) {
        setSelectedCamera(null);
      }
      await loadCameras();
      return success;
    },
    [loadCameras, selectedCamera]
  );

  const resetAll = useCallback(async () => {
    await cameraService.resetAllCamerasApi();
    setSelectedCamera(null);
    await loadCameras();
  }, [loadCameras]);

  return (
    <CameraStoreContext.Provider
      value={{
        cameras,
        selectedCamera,
        loading,
        loadCameras,
        selectCamera,
        saveCamera,
        deleteCamera,
        resetAll,
      }}
    >
      {children}
    </CameraStoreContext.Provider>
  );
};

export const useCameraStore = () => {
  const ctx = useContext(CameraStoreContext);
  if (!ctx) {
    throw new Error('useCameraStore phải được dùng bên trong CameraStoreProvider');
  }
  return ctx;
};

