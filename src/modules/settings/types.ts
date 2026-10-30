/**
 * @file types.ts
 * @desc Khai báo types cho module settings
 * @layer modules/settings
 */

export type ThemeMode = 'dark' | 'light' | 'system';
export type TransportProtocol = 'tcp' | 'udp' | 'auto';

export interface AppSettings {
  theme: ThemeMode;
  transport: TransportProtocol;
}

