/**
 * @file camera.service.ts
 * @desc Service xử lý API/Repository cho module camera
 * @layer modules/camera/services
 */

import { Camera, CameraInput, CameraRepositoryPort } from '@/shared/types';
import { FakeCameraRepository } from '@/shared/services/mock/fake-camera-repository';

// Khởi tạo repository duy nhất (có thể thay thế adapter bằng SQLite sau này)
const cameraRepository: CameraRepositoryPort = new FakeCameraRepository();

export const fetchCamerasApi = async (): Promise<Camera[]> => {
  return await cameraRepository.getAll();
};

export const fetchCameraByIdApi = async (id: string): Promise<Camera | null> => {
  return await cameraRepository.getById(id);
};

export const createCameraApi = async (input: CameraInput): Promise<Camera> => {
  return await cameraRepository.create(input);
};

export const updateCameraApi = async (id: string, input: CameraInput): Promise<Camera> => {
  return await cameraRepository.update(id, input);
};

export const deleteCameraApi = async (id: string): Promise<boolean> => {
  return await cameraRepository.delete(id);
};

export const resetAllCamerasApi = async (): Promise<void> => {
  const currentList = await cameraRepository.getAll();
  for (const cam of currentList) {
    await cameraRepository.delete(cam.id);
  }
};

