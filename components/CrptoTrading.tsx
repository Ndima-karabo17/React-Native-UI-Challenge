import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CoinType } from './types';
import { ETH_BALANCE, USD_BALANCE, ETH_TO_USD } from './constant';
import { convertAmount, calcTradeDetails, formatNumber } from './utils';
import Currency from './Currency';
import HandlerCurrency from './HandlerCurrency';
import DetailsRow from './DetailsRow';

const CryptoTrading: React.FC = () => {
  const { top, bottom } = useSafeAreaInsets();

  const [topCoin, setTopCoin]       = useState<CoinType>('ETH');
  const [topAmount, setTopAmount]   = useState<string>('1');
  const [bottomAmount, setBottomAmount] = useState<string>((ETH_TO_USD).toFixed(2));
  const [showSuccess, setShowSuccess]   = useState(false);

  const bottomCoin: CoinType = topCoin === 'ETH' ? 'USD' : 'ETH';
  const isBuying             = topCoin === 'USD';
  const actionLabel          = isBuying ? 'Buy ETH' : 'Sell ETH';

  const { valid, estimatedFee, youWillReceive, spread, gasFee } =
    calcTradeDetails(topCoin, topAmount, bottomAmount);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleTopChange = useCallback(
    (val: string) => {
      setTopAmount(val);
      setBottomAmount(convertAmount(val, topCoin));
    },
    [topCoin],
  );

  const handleBottomChange = useCallback(
    (val: string) => {
      setBottomAmount(val);
      setTopAmount(convertAmount(val, bottomCoin));
    },
    [bottomCoin],
  );

  const handleSwap = useCallback(() => {
    setTopCoin((prev) => (prev === 'ETH' ? 'USD' : 'ETH'));
    setTopAmount(bottomAmount);
    setBottomAmount(topAmount);
  }, [topAmount, bottomAmount]);

  const handleAction = () => {
    if (!valid) return;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <View style={[styles.screen, { paddingTop: top, paddingBottom: bottom }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Exchange</Text>
          <View style={styles.liveIndicator} />
        </View>

        {/* ── Currency inputs ── */}
        <View style={styles.body}>
          <Currency
            coin={topCoin}
            amount={topAmount}
            balance={topCoin === 'ETH' ? ETH_BALANCE : USD_BALANCE}
            onAmountChange={handleTopChange}
          />

          <HandlerCurrency onSwap={handleSwap} />

          <Currency
            coin={bottomCoin}
            amount={bottomAmount}
            balance={bottomCoin === 'ETH' ? ETH_BALANCE : USD_BALANCE}
            onAmountChange={handleBottomChange}
          />

          {/* ── Exchange rate ── */}
          <View style={styles.rateRow}>
            <Text style={styles.rateDot}>◆</Text>
            <Text style={styles.rateText}>
              1 ETH = {formatNumber(ETH_TO_USD)} USD
            </Text>
            <Text style={styles.rateDot}>◆</Text>
          </View>

          {/* ── Action button ── */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              !valid        && styles.actionButtonDisabled,
              showSuccess   && styles.actionButtonSuccess,
            ]}
            onPress={handleAction}
            disabled={!valid}
            activeOpacity={0.85}
          >
            <Text style={[styles.actionButtonText, !valid && styles.actionButtonTextDisabled]}>
              {showSuccess ? '✓  Order Placed!' : actionLabel}
            </Text>
          </TouchableOpacity>

          {/* ── Trade details ── */}
          <View style={styles.detailsContainer}>
            <DetailsRow label="Estimated fee"    value={estimatedFee} />
            <DetailsRow label="You will receive" value={youWillReceive} highlight={valid} />
            <DetailsRow label="Spread"           value={spread} />
            <DetailsRow label="Gas fee"          value={gasFee} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a0a12',
  },
  scroll: {
    flexGrow: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    position: 'relative',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
  liveIndicator: {
    position: 'absolute',
    right: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },

  // Body
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // Exchange rate
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 14,
  },
  rateText: {
    color: '#555',
    fontSize: 12,
  },
  rateDot: {
    color: '#a78bfa',
    fontSize: 10,
  },

  // Action button
  actionButton: {
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 4,
  },
  actionButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    shadowOpacity: 0,
    elevation: 0,
  },
  actionButtonSuccess: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
  },
  actionButtonTextDisabled: {
    color: '#444',
  },

  // Details
  detailsContainer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
});

export default CryptoTrading;