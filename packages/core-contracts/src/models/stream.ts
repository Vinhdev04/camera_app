/**
 * Trạng thái của máy trạng thái Live View FSM (Flow A2)
 */
export type LiveViewState = 
  | 'idle'
  | 'connecting'
  | 'playing'
  | 'buffering'
  | 'reconnecting'
  | 'failed';

/**
 * Loại luồng stream video
 */
export type StreamQuality = 'main' | 'sub';

/**
 * Thông số kỹ thuật của stream đang phát
 */
export interface StreamStats {
  resolution?: string; // Ví dụ: 1920x1080 hoặc 640x360
  fps?: number;
  bitrateKbps?: number;
  codec?: string; // H.264 hoặc H.265
  timeToFirstFrameMs?: number;
  reconnectAttempts?: number;
}
