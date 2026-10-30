/**
 * @file diagnostics.service.ts
 * @desc Service chẩn đoán mạng LAN và kiểm tra RTSP
 * @layer modules/diagnostics/services
 */

import { Camera, CameraInput, ConnectionTestResult, StepResult } from '@/shared/types';
import { FakeConnectionTest } from '@/shared/services/mock/fake-connection-test';

const tester = new FakeConnectionTest();

export const runConnectionTestApi = async (
  input: CameraInput,
  onStepUpdate?: (step: StepResult) => void
): Promise<ConnectionTestResult> => {
  return await tester.testConnection(input, onStepUpdate);
};

export const fetchDiagnosticDataApi = (camera: Camera) => {
  return [
    { label: 'Địa chỉ IP Camera', value: camera.host },
    { label: 'Cổng RTSP (TCP)', value: `${camera.port} (Đang mở)` },
    { label: 'Đường dẫn Main Stream', value: camera.path },
    { label: 'Giao thức truyền tải', value: camera.transport.toUpperCase() },
    { label: 'Độ trễ Ping nội mạng (LAN)', value: '12 ms (Rất tốt)' },
    { label: 'Định dạng mã hóa Video (Codec)', value: 'H.264 / AVC Baseline' },
    { label: 'Thời gian phản hồi kết nối', value: '1.2s' },
    {
      label: 'Trạng thái xác thực (Auth)',
      value: camera.hasPassword ? 'Basic/Digest (Đã lưu trong Keychain)' : 'Không mật khẩu',
    },
  ];
};

