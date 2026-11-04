/**
 * @file types.ts
 * @desc Định nghĩa các kiểu dữ liệu và trạng thái xác thực người dùng (Auth Module)
 * @layer modules/auth
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  isBiometricEnabled?: boolean;
}

export type AuthMode = 'local' | 'account';
export type AuthTab = 'login' | 'register';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  authMode: AuthMode;
  authTab: AuthTab;
}
