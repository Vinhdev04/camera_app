/**
 * @file index.ts
 * @desc Barrel export cho Module Auth (Đăng nhập / Đăng ký / Xác thực)
 * Tuân thủ nguyên tắc AR-06: Public API duy nhất cho feature module
 * @layer modules/auth
 */

export * from './types';
export * from './screens/AuthScreen';
export * from './hooks/useAuth';
export * from './services/auth.service';

