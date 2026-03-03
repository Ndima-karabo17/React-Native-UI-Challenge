import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CurrencySectionProps } from './types';
import { ETH_BALANCE, USD_BALANCE } from './constant';
import { formatNumber, getConversionHint } from './utils';

const Currency: React.FC<CurrencySectionProps> = ({ coin, amount, balance, onAmountChange }) => {
  const isETH         = coin === 'ETH';
  const balanceLabel  = isETH ? `${ETH_BALANCE} ETH` : `$${formatNumber(USD_BALANCE)}`;
  const maxAmount     = isETH ? ETH_BALANCE : USD_BALANCE;
  const conversionHint = getConversionHint(coin, amount);

  return (
    <View style={styles.section}>
      {/* ── Top row: coin selector + balance ── */}
      <View style={styles.topRow}>
        <View style={styles.coinSelector}>
          {isETH ? (
            <MaterialCommunityIcons name="ethereum" size={20} color="#a78bfa" />
          ) : (
            <View style={styles.usdIcon}>
              <Text style={styles.usdIconText}>$</Text>
            </View>
          )}
          <Text style={styles.coinLabel}>{coin}</Text>
          <Ionicons name="chevron-down" size={14} color="#666" />
        </View>

        <View style={styles.balanceArea}>
          <Text style={styles.balanceText}>Bal: {balanceLabel}</Text>
          <TouchableOpacity
            style={styles.maxButton}
            onPress={() => onAmountChange(maxAmount.toString())}
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

      {/* ── Conversion hint ── */}
      <Text style={styles.hint}>{conversionHint}</Text>
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
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  coinLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
    marginHorizontal: 2,
  },
  usdIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usdIconText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700' as const,
  },
  balanceArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  balanceText: {
    color: '#666',
    fontSize: 12,
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