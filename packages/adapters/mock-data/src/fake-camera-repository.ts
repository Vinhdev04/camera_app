import {
  Camera,
  CameraInput,
  CameraRepositoryPort,
} from '@uicv/core-contracts';
import { INITIAL_MOCK_CAMERAS } from './mock-cameras';

export class FakeCameraRepository implements CameraRepositoryPort {
  private cameras: Camera[] = [...INITIAL_MOCK_CAMERAS];

  async getAll(): Promise<Camera[]> {
    // Giả lập độ trễ đọc dữ liệu nhẹ (50ms)
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...this.cameras];
  }

  async getById(id: string): Promise<Camera | null> {
    const found = this.cameras.find((c) => c.id === id);
    return found ? { ...found } : null;
  }

  async create(input: CameraInput): Promise<Camera> {
    const newCamera: Camera = {
      id: `cam-${Date.now()}`,
      name: input.name,
      host: input.host,
      port: input.port,
      path: input.path,
      substreamPath: input.substreamPath,
      username: input.username,
      hasPassword: Boolean(input.password),
      transport: input.transport || 'tcp',
      status: 'online',
      manufacturer: input.manufacturer || 'Generic',
      isPtzSupported: false,
      lastCheckedAt: 'Vừa thêm',
    };

    this.cameras.unshift(newCamera);
    return { ...newCamera };
  }

  async update(id: string, input: Partial<CameraInput>): Promise<Camera> {
    const index = this.cameras.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Camera ${id} không tồn tại`);
    }

    const current = this.cameras[index];
    const updated: Camera = {
      ...current,
      name: input.name ?? current.name,
      host: input.host ?? current.host,
      port: input.port ?? current.port,
      path: input.path ?? current.path,
      substreamPath: input.substreamPath ?? current.substreamPath,
      username: input.username ?? current.username,
      hasPassword: input.password !== undefined ? Boolean(input.password) : current.hasPassword,
      transport: input.transport ?? current.transport,
      lastCheckedAt: 'Vừa cập nhật',
    };

    this.cameras[index] = updated;
    return { ...updated };
  }

  async delete(id: string): Promise<boolean> {
    const initialLen = this.cameras.length;
    this.cameras = this.cameras.filter((c) => c.id !== id);
    return this.cameras.length < initialLen;
  }

  async updateStatus(
    id: string,
    status: Camera['status'],
    errorMessage?: string
  ): Promise<void> {
    const cam = this.cameras.find((c) => c.id === id);
    if (cam) {
      cam.status = status;
      cam.errorMessage = errorMessage;
      cam.lastCheckedAt = 'Vừa kiểm tra';
    }
  }
}
