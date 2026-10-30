/**
 * @file DiagnosticInfoTable.tsx
 * @desc Dumb Component hiển thị bảng thông số chẩn đoán
 * @layer modules/diagnostics/components
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/shared/components';
import { DiagnosticItem } from '../types';
import { styles } from './DiagnosticInfoTable.styles';

export interface DiagnosticInfoTableProps {
  data: DiagnosticItem[];
}

export const DiagnosticInfoTable: React.FC<DiagnosticInfoTableProps> = ({ data }) => {
  return (
    <Card style={styles.dataCard}>
      {data.map((item, idx) => (
        <View key={idx} style={styles.diagRow}>
          <Text style={styles.diagLabel}>{item.label}</Text>
          <Text style={styles.diagValue}>{item.value}</Text>
        </View>
      ))}
    </Card>
  );
};

export default DiagnosticInfoTable;

