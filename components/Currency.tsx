import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CurrencySectionProps } from './types';
import { formatNumber, getConversionHint } from './utils';

const Currency: React.FC<CurrencySectionProps> = ({
  coin,
  amount,
  onAmountChange,
  onCoinSelect,
}) => {
  const hint = getConversionHint(amount, coin.symbol, coin.symbol);

  return (
    <View style={styles.section}>
      {/* ── Top row ── */}
      <View style={styles.topRow}>
        {/* Coin selector button */}
        <TouchableOpacity style={styles.coinSelector} onPress={onCoinSelect} activeOpacity={0.7}>
          {/* Colored circle icon */}
          <View style={[styles.coinIcon, { backgroundColor: coin.color + '33' }]}>
            <Text style={[styles.coinIconText, { color: coin.color }]}>
              {coin.symbol.slice(0, 1)}
            </Text>
          </View>
          <View>
            <Text style={styles.coinSymbol}>{coin.symbol}</Text>
            <Text style={styles.coinName}>{coin.name}</Text>
          </View>
          <Ionicons name="chevron-down" size={14} color="#666" style={{ marginLeft: 2 }} />
        </TouchableOpacity>

        {/* Balance + MAX */}
        <View style={styles.balanceArea}>
          <Text style={styles.balanceText}>
            {formatNumber(coin.balance, coin.symbol === 'USDT' || coin.symbol === 'USDC' ? 2 : 4)} {coin.symbol}
          </Text>
          <TouchableOpacity
            style={styles.maxButton}
            onPress={() => onAmountChange(coin.balance.toString())}
            activeOpacity={0.7}
          >
            <Text style={styles.maxButtonText}>MAX</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Amount input ── */}
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(val) => onAmountChange(val.replace(/[^0-9.]/g, ''))}
        keyboardType="decimal-pad"
        placeholder="0.00"
        placeholderTextColor="#444"
      />

      {/* ── USD hint ── */}
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  coinSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  coinIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinIconText: {
    fontSize: 13,
    fontWeight: '700' as const,
  },
  coinSymbol: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 16,
  },
  coinName: {
    color: '#666',
    fontSize: 10,
    lineHeight: 13,
  },
  balanceArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  balanceText: {
    color: '#666',
    fontSize: 11,
  },
  maxButton: {
    backgroundColor: 'rgba(139,92,246,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.4)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  maxButtonText: {
    color: '#a78bfa',
    fontSize: 11,
    fontWeight: '600' as const,
  },
  input: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
    paddingVertical: 4,
  },
  hint: {
    color: '#555',
    fontSize: 12,
    marginTop: 2,
  },
});

export default Currency;