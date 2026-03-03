import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { color: '#8E8E93', fontSize: 14 },
  value: { color: '#FFF', fontSize: 14 },
});

export default DetailRow;
