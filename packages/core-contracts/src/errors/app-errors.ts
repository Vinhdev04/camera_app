/**
 * Mã lỗi chuẩn của hệ thống UICV
 */
export enum ErrorCode {
  CAMERA_NOT_FOUND = 'CAMERA_NOT_FOUND',
  INVALID_INPUT = 'INVALID_INPUT',
  RTSP_TIMEOUT = 'RTSP_TIMEOUT',
  RTSP_UNAUTHORIZED = 'RTSP_UNAUTHORIZED',
  RTSP_NOT_FOUND = 'RTSP_NOT_FOUND',
  UNSUPPORTED_CODEC = 'UNSUPPORTED_CODEC',
  NETWORK_OFFLINE = 'NETWORK_OFFLINE',
  LOCAL_NETWORK_PERMISSION_DENIED = 'LOCAL_NETWORK_PERMISSION_DENIED',
  HARDWARE_DECODER_LIMIT = 'HARDWARE_DECODER_LIMIT',
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}
