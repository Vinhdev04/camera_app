import { CameraInput } from '../models/camera';

export type ConnectionTestStep = 'dns' | 'tcp' | 'options' | 'describe' | 'auth';

export type StepStatus = 'pending' | 'running' | 'success' | 'failed';

export interface StepResult {
  step: ConnectionTestStep;
  status: StepStatus;
  message?: string;
  durationMs?: number;
}

export interface ConnectionTestResult {
  isSuccess: boolean;
  steps: StepResult[];
  error?: string;
  detectedCodec?: string;
}

/**
 * Port kiểm tra kết nối RTSP từng bước (UC-05)
 */
export interface ConnectionTestPort {
  testConnection(
    input: CameraInput,
    onStepUpdate?: (step: StepResult) => void
  ): Promise<ConnectionTestResult>;
}
