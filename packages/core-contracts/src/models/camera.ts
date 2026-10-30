/**
 * Trạng thái kết nối của Camera trong hệ thống
 */
export type CameraStatus = 'online' | 'offline' | 'connecting' | 'error';

/**
 * Giao thức truyền tải mạng cho RTSP
 */
export type TransportProtocol = 'tcp' | 'udp' | 'auto';

/**
 * Mô hình dữ liệu Camera chuẩn
 */
export interface Camera {
  id: string;
  name: string;
  host: string;
  port: number;
  path: string;
  substreamPath?: string;
  username?: string;
  hasPassword?: boolean;
  transport: TransportProtocol;
  status: CameraStatus;
  lastCheckedAt?: string;
  errorMessage?: string;
  manufacturer?: string; // Ví dụ: Yoosee, Imou, Generic
  isPtzSupported?: boolean;
}

/**
 * Dữ liệu đầu vào để tạo hoặc sửa Camera
 */
export interface CameraInput {
  name: string;
  host: string;
  port: number;
  path: string;
  substreamPath?: string;
  username?: string;
  password?: string;
  transport?: TransportProtocol;
  manufacturer?: string;
}
