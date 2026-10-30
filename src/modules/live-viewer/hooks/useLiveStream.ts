/**
 * @file useLiveStream.ts
 * @desc Hook quản lý trạng thái phát video trực tiếp, chuyển luồng HD/SD và gửi lệnh PTZ
 * @layer modules/live-viewer/hooks
 */

import { useState, useCallback } from 'react';
import { Camera, LiveViewState, StreamQuality } from '@/shared/types';
import { PtzDirection } from '../types';
import * as liveStreamService from '../services/liveStream.service';

export const useLiveStream = (camera?: Camera | null) => {
  const [quality, setQuality] = useState<StreamQuality>('main');
  const [liveState, setLiveState] = useState<LiveViewState>('playing');
  const [showPtz, setShowPtz] = useState(false);
  const [snapshotAlert, setSnapshotAlert] = useState<string | null>(null);

  const takeSnapshot = useCallback(async () => {
    if (!camera) return;
    const time = await liveStreamService.captureSnapshotApi(camera.id);
    setSnapshotAlert(`Đã lưu ảnh chụp nhanh lúc ${time} vào Thư viện ảnh!`);
    setTimeout(() => setSnapshotAlert(null), 3000);
  }, [camera]);

  const sendPtz = useCallback(
    async (direction: PtzDirection) => {
      if (!camera) return;
      await liveStreamService.sendPtzCommandApi(camera.id, direction);
    },
    [camera]
  );

  const reconnect = useCallback(() => {
    setLiveState('reconnecting');
    setTimeout(() => setLiveState('playing'), 1200);
  }, []);

  const togglePtz = useCallback(() => {
    setShowPtz((prev) => !prev);
  }, []);

  const changeQuality = useCallback((q: StreamQuality) => {
    setQuality(q);
  }, []);

  return {
    quality,
    liveState,
    showPtz,
    snapshotAlert,
    takeSnapshot,
    sendPtz,
    reconnect,
    togglePtz,
    changeQuality,
  };
};

export default useLiveStream;

