/**
 * @file PtzPad.tsx
 * @desc Dumb component hiển thị bàn phím điều khiển xoay camera ONVIF PTZ
 * @layer modules/live-viewer/components
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PtzDirection } from '../types';
import { styles } from './PtzPad.styles';

export interface PtzPadProps {
  onDirection: (direction: PtzDirection) => void;
}

export const PtzPad: React.FC<PtzPadProps> = ({ onDirection }) => {
  return (
    <View style={styles.ptzPanel}>
      <Text style={styles.ptzTitle}>ĐIỀU KHIỂN XOAY ONVIF PTZ</Text>
      <View style={styles.ptzGrid}>
        <View style={styles.ptzRow}>
          <View style={{ width: 52 }} />
          <TouchableOpacity style={styles.ptzBtn} onPress={() => onDirection('up')}>
            <Text style={styles.ptzBtnText}>▲</Text>
          </TouchableOpacity>
          <View style={{ width: 52 }} />
        </View>
        <View style={styles.ptzRow}>
          <TouchableOpacity style={styles.ptzBtn} onPress={() => onDirection('left')}>
            <Text style={styles.ptzBtnText}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ptzBtn} onPress={() => onDirection('home')}>
            <Text style={[styles.ptzBtnText, { fontSize: 13 }]}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ptzBtn} onPress={() => onDirection('right')}>
            <Text style={styles.ptzBtnText}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ptzRow}>
          <View style={{ width: 52 }} />
          <TouchableOpacity style={styles.ptzBtn} onPress={() => onDirection('down')}>
            <Text style={styles.ptzBtnText}>▼</Text>
          </TouchableOpacity>
          <View style={{ width: 52 }} />
        </View>
      </View>
    </View>
  );
};

export default PtzPad;

