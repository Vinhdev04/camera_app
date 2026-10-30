import { LiveViewState, StreamQuality, StreamStats } from '../models/stream';

export interface PlayerEvents {
  onStateChange: (state: LiveViewState) => void;
  onError: (error: string) => void;
  onStatsUpdate: (stats: StreamStats) => void;
}

/**
 * Port trừu tượng bọc Native Player (VLC / ExoPlayer / Fake)
 */
export interface PlayerPort {
  play(url: string, quality: StreamQuality): Promise<void>;
  stop(): Promise<void>;
  switchQuality(quality: StreamQuality): Promise<void>;
  takeSnapshot(): Promise<string>; // Trả về đường dẫn ảnh lưu tạm
  sendPtzCommand(direction: 'up' | 'down' | 'left' | 'right' | 'zoomIn' | 'zoomOut'): Promise<void>;
  dispose(): void;
}
