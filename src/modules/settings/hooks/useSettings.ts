/**
 * @file useSettings.ts
 * @desc Hook quản lý cài đặt theme, giao thức và xoá dữ liệu
 * @layer modules/settings/hooks
 */

import { useState, useCallback } from 'react';
import { ThemeMode, TransportProtocol } from '../types';
import * as settingsService from '../services/settings.service';
import { useCameras } from '@/modules/camera/hooks/useCameras';

export const useSettings = () => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [transport, setTransport] = useState<TransportProtocol>('tcp');
  const { resetAllCameras } = useCameras();

  const updateTheme = useCallback(async (newTheme: ThemeMode) => {
    setTheme(newTheme);
    await settingsService.saveSettingsApi({ theme: newTheme });
  }, []);

  const updateTransport = useCallback(async (newTransport: TransportProtocol) => {
    setTransport(newTransport);
    await settingsService.saveSettingsApi({ transport: newTransport });
  }, []);

  const resetAllData = useCallback(async () => {
    await settingsService.clearAllAppDataApi();
    await resetAllCameras();
  }, [resetAllCameras]);

  return {
    theme,
    transport,
    updateTheme,
    updateTransport,
    resetAllData,
  };
};

export default useSettings;

