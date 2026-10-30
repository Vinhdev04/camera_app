/**
 * @file types.ts
 * @desc Khai báo types cho module diagnostics
 * @layer modules/diagnostics
 */

import { StepResult, ConnectionTestResult } from '@/shared/types';

export interface DiagnosticItem {
  label: string;
  value: string;
}

export interface DiagnosticsState {
  testing: boolean;
  steps: StepResult[];
  result: ConnectionTestResult | null;
}

