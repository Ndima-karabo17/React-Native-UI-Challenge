import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DetailsRowProps } from './types';

const DetailsRow: React.FC<DetailsRowProps> = ({ label, value, highlight = false }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, highlight && styles.valueHighlight]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  label: {
    color: '#666',
    fontSize: 13,
  },
  value: {
    color: '#ccc',
    fontSize: 13,
  },
  valueHighlight: {
    color: '#a78bfa',
    fontWeight: '600' as const,
  },
});

export default DetailsRow;