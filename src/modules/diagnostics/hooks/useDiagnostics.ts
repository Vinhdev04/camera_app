/**
 * @file useDiagnostics.ts
 * @desc Hook quản lý kiểm tra kết nối và trích xuất báo cáo chẩn đoán
 * @layer modules/diagnostics/hooks
 */

import { useState, useCallback } from 'react';
import { Camera, CameraInput, ConnectionTestResult, StepResult } from '@/shared/types';
import * as diagnosticsService from '../services/diagnostics.service';

export const useDiagnostics = () => {
  const [testing, setTesting] = useState(false);
  const [steps, setSteps] = useState<StepResult[]>([]);
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);

  const testConnection = useCallback(
    async (input: CameraInput): Promise<ConnectionTestResult> => {
      setTesting(true);
      setSteps([]);
      setTestResult(null);

      const result = await diagnosticsService.runConnectionTestApi(
        input,
        (stepUpdate: StepResult) => {
          setSteps((prev) => {
            const filtered = prev.filter((s) => s.step !== stepUpdate.step);
            return [...filtered, stepUpdate];
          });
        }
      );

      setTesting(false);
      setTestResult(result);
      return result;
    },
    []
  );

  const getCameraDiagnostics = useCallback((camera: Camera) => {
    return diagnosticsService.fetchDiagnosticDataApi(camera);
  }, []);

  const resetTest = useCallback(() => {
    setSteps([]);
    setTestResult(null);
    setTesting(false);
  }, []);

  return {
    testing,
    steps,
    testResult,
    testConnection,
    getCameraDiagnostics,
    resetTest,
  };
};

export default useDiagnostics;

