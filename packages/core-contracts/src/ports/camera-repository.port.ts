import { Camera, CameraInput } from '../models/camera';

/**
 * Port giao tiếp quản lý lưu trữ Camera
 * Cho phép hoán đổi giữa Fake / In-memory và SQLite Storage
 */
export interface CameraRepositoryPort {
  getAll(): Promise<Camera[]>;
  getById(id: string): Promise<Camera | null>;
  create(input: CameraInput): Promise<Camera>;
  update(id: string, input: Partial<CameraInput>): Promise<Camera>;
  delete(id: string): Promise<boolean>;
  updateStatus(id: string, status: Camera['status'], errorMessage?: string): Promise<void>;
}
