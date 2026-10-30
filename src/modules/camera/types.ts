/**
 * @file types.ts
 * @desc Khai báo types, interfaces riêng biệt cho module camera
 * @layer modules/camera
 */

import { Camera, CameraInput } from '@/shared/types';

export interface CameraModuleState {
  cameras: Camera[];
  selectedCamera: Camera | null;
  loading: boolean;
  error: string | null;
}

export interface CameraCardProps {
  camera: Camera;
  onPress: (camera: Camera) => void;
  onDiagnostics: (camera: Camera) => void;
}

