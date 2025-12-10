import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Currency from './Currency';
import HandlerCurrency from './HandlerCurrency';
import DetailsRow from './DetailsRow';

const CryptoTrading: React.FC = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exchange</Text>
      </View>

      <Currency coin="ETH" amount="12,695" balance="293.0187" />
      <HandlerCurrency />
      <Currency coin="USD" amount="43,937.4" balance="12,987.21" />

      <Text style={styles.exchangeRateText}>1 ETH = 3,461.02 USD</Text>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Buy ETH</Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <DetailsRow label="Estimate fee" value="4.28 usd" />
        <DetailsRow label="You will receive" value="43,941.68 USD" />
        <DetailsRow label="Spread" value="0.2%" />
        <DetailsRow label="Gas fee" value="0.0045 ETH" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E0B16', paddingHorizontal: 20 },
  header: { alignItems: 'center', marginVertical: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '500' },
  exchangeRateText: { color: '#FFF', textAlign: 'center', marginVertical: 20 },
  actionButton: {
    backgroundColor: '#FFF',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 30,
  },
  actionButtonText: { color: '#000', fontSize: 18, fontWeight: '600' },
  detailsContainer: { paddingHorizontal: 5 },
});

export default CryptoTrading;
