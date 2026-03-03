
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface CurrencySectionProps {
  coin: string;
  amount: string;
  balance: string;
}

const CurrencySection: React.FC<CurrencySectionProps> = ({ coin, amount, balance }) => {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        {coin === 'ETH' ? (
          <MaterialCommunityIcons name="ethereum" size={24} color="#FFF" />
        ) : (
          <Text style={styles.usdSymbol}>$</Text>
        )}
        <Text style={styles.coinText}>{coin}</Text>
        <Ionicons name="chevron-down" size={16} color="#888" />
      </View>
      <TextInput style={styles.input} value={amount} keyboardType="numeric" />
      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>{balance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { paddingVertical: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  usdSymbol: { color: '#FFF', fontSize: 14, marginRight: 8 },
  coinText: { color: '#FFF', fontSize: 20, fontWeight: '600' },
  input: { color: '#FFF', fontSize: 42, marginVertical: 5 },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  balanceLabel: { color: '#8E8E93', fontSize: 14 },
  balanceValue: { color: '#8E8E93', fontSize: 14 },
});

export default CurrencySection;
