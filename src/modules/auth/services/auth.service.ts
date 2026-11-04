/**
 * @file auth.service.ts
 * @desc Service xử lý xác thực tài khoản người dùng và sinh trắc học (Mock/Phase 4 Roadmap)
 * Tuân thủ bảo mật SEC-002: Không log credential hoặc plaintext password
 * @layer modules/auth/services
 */

import { User, LoginCredentials, RegisterCredentials } from '../types';

/**
 * Giả lập độ trễ mạng khi gọi API
 * @param ms Thời gian chờ tính bằng mili-giây
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class AuthService {
  private static currentUser: User | null = null;

  /**
   * Đăng nhập bằng Email và Mật khẩu
   * @param credentials Thông tin đăng nhập
   * @returns Thông tin User nếu thành công
   */
  public static async login(credentials: LoginCredentials): Promise<User> {
    await delay(700);

    const email = credentials.email.trim();
    if (!email || !credentials.password) {
      throw new Error('Vui lòng điền đầy đủ email và mật khẩu');
    }

    // Kiểm tra định dạng email cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Địa chỉ email không đúng định dạng');
    }

    if (credentials.password.length < 6) {
      throw new Error('Mật khẩu phải có tối thiểu 6 ký tự');
    }

    // Giả lập đăng nhập thành công
    const user: User = {
      id: 'usr_uicv_9872',
      email: email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
      isBiometricEnabled: true,
    };

    AuthService.currentUser = user;
    return user;
  }

  /**
   * Đăng ký tài khoản người dùng mới
   * @param credentials Thông tin đăng ký
   * @returns Thông tin User mới tạo
   */
  public static async register(credentials: RegisterCredentials): Promise<User> {
    await delay(900);

    const name = credentials.name.trim();
    const email = credentials.email.trim();

    if (!name || !email || !credentials.password) {
      throw new Error('Vui lòng điền đầy đủ các trường bắt buộc (*)');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Địa chỉ email không đúng định dạng');
    }

    if (credentials.password.length < 8) {
      throw new Error('Mật khẩu bảo mật phải có tối thiểu 8 ký tự');
    }

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Xác nhận mật khẩu không trùng khớp');
    }

    if (!credentials.agreeToTerms) {
      throw new Error('Bạn cần đồng ý với Điều khoản dịch vụ & Chính sách bảo mật');
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      email: email,
      name: name,
      createdAt: new Date().toISOString(),
      isBiometricEnabled: false,
    };

    AuthService.currentUser = newUser;
    return newUser;
  }

  /**
   * Đăng nhập nhanh bằng Sinh trắc học (Face ID / Vân tay)
   * @returns Thông tin User
   */
  public static async loginWithBiometrics(): Promise<User> {
    await delay(600);

    const user: User = {
      id: 'usr_biometric_demo',
      email: 'an.nguyen@vidu.com',
      name: 'An Nguyễn',
      createdAt: new Date().toISOString(),
      isBiometricEnabled: true,
    };

    AuthService.currentUser = user;
    return user;
  }

  /**
   * Gửi yêu cầu đặt lại mật khẩu qua Email
   * @param email Địa chỉ email
   */
  public static async requestPasswordReset(email: string): Promise<boolean> {
    await delay(800);
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      throw new Error('Vui lòng nhập địa chỉ email hợp lệ để nhận mã xác nhận');
    }
    return true;
  }

  /**
   * Đăng xuất khỏi hệ thống
   */
  public static async logout(): Promise<void> {
    await delay(300);
    AuthService.currentUser = null;
  }

  /**
   * Lấy người dùng đang đăng nhập
   */
  public static getCurrentUser(): User | null {
    return AuthService.currentUser;
  }
}

