// components/Divider.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Divider: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.line} />
    <TouchableOpacity style={styles.button}>
      <MaterialCommunityIcons name="swap-vertical" size={24} color="#FFF" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { height: 40, justifyContent: 'center', alignItems: 'center' },
  line: { width: '100%', height: 1, backgroundColor: '#2C2C35', position: 'absolute' },
  button: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
});

export default Divider;
