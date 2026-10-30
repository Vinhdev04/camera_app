/**
 * @file types.ts
 * @desc Khai báo types cho module live-viewer
 * @layer modules/live-viewer
 */

import { LiveViewState, StreamQuality } from '@/shared/types';

export interface LiveStreamOptions {
  quality: StreamQuality;
  state: LiveViewState;
  showPtz: boolean;
  snapshotNotice: string | null;
}

export type PtzDirection = 'up' | 'down' | 'left' | 'right' | 'home';

