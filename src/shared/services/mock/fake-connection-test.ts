import {
  CameraInput,
  ConnectionTestPort,
  ConnectionTestResult,
  StepResult,
} from '@/shared/types';

export class FakeConnectionTest implements ConnectionTestPort {
  async testConnection(
    input: CameraInput,
    onStepUpdate?: (step: StepResult) => void
  ): Promise<ConnectionTestResult> {
    const steps: StepResult[] = [];

    const runStep = async (
      step: StepResult['step'],
      duration: number,
      failIf?: boolean,
      failMsg?: string
    ) => {
      onStepUpdate?.({ step, status: 'running' });
      await new Promise((res) => setTimeout(res, duration));

      if (failIf) {
        const result: StepResult = {
          step,
          status: 'failed',
          message: failMsg,
          durationMs: duration,
        };
        steps.push(result);
        onStepUpdate?.(result);
        throw new Error(failMsg);
      }

      const result: StepResult = {
        step,
        status: 'success',
        durationMs: duration,
      };
      steps.push(result);
      onStepUpdate?.(result);
    };

    try {
      // 1. Phân giải DNS / Kiểm tra Host
      const isInvalidHost = input.host.includes('error') || input.host === '0.0.0.0';
      await runStep('dns', 150, isInvalidHost, 'Không thể phân giải địa chỉ máy chủ');

      // 2. Mở cổng TCP 554
      const isWrongPort = input.port !== 554 && input.port !== 8554;
      await runStep('tcp', 200, isWrongPort, `Cổng ${input.port} đóng hoặc bị firewall chặn`);

      // 3. RTSP OPTIONS
      await runStep('options', 180);

      // 4. RTSP DESCRIBE
      const isWrongPath = !input.path.startsWith('/');
      await runStep('describe', 250, isWrongPath, 'Đường dẫn RTSP không hợp lệ (phải bắt đầu bằng /)');

      // 5. Xác thực (Auth)
      const isWrongAuth = input.password === 'wrong';
      await runStep('auth', 150, isWrongAuth, '401 Unauthorized: Mật khẩu camera không chính xác');

      return {
        isSuccess: true,
        steps,
        detectedCodec: 'H.264 (Baseline)',
      };
    } catch (err: any) {
      return {
        isSuccess: false,
        steps,
        error: err.message,
      };
    }
  }
}
