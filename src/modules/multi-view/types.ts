/**
 * @file types.ts
 * @desc Khai báo types cho module multi-view
 * @layer modules/multi-view
 */

import { Camera } from '@/shared/types';

export interface MultiViewGridProps {
  cameras: Camera[];
  onSelectCamera: (camera: Camera) => void;
}

