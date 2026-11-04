/**
 * @file useAuth.ts
 * @desc Hook quản lý trạng thái và hành vi xác thực người dùng trong module Auth
 * @layer modules/auth/hooks
 */

import { useState, useCallback } from 'react';
import {
  User,
  AuthMode,
  AuthTab,
  LoginCredentials,
  RegisterCredentials,
} from '../types';
import { AuthService } from '../services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(AuthService.getCurrentUser());
  const [authMode, setAuthMode] = useState<AuthMode>('account');
  const [authTab, setAuthTab] = useState<AuthTab>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  /**
   * Thực hiện đăng nhập bằng mật khẩu
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedUser = await AuthService.login(credentials);
      setUser(loggedUser);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập thất bại';
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Thực hiện đăng ký tài khoản mới
   */
  const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = await AuthService.register(credentials);
      setUser(newUser);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Đăng ký thất bại';
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Đăng nhập nhanh bằng Face ID / Vân tay
   */
  const loginWithBiometrics = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedUser = await AuthService.loginWithBiometrics();
      setUser(loggedUser);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Xác thực sinh trắc học thất bại';
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Đăng xuất
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    authMode,
    authTab,
    isLoading,
    error,
    setAuthMode,
    setAuthTab,
    clearError,
    login,
    register,
    loginWithBiometrics,
    logout,
  };
};

