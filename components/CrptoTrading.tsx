import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Coin, CoinSymbol } from './types';
import { COINS, convertBetweenCoins } from './constant';
import { calcTradeDetails, formatNumber } from './utils';
import Currency from './Currency';
import HandlerCurrency from './HandlerCurrency';
import DetailsRow from './DetailsRow';
import CoinPickerModal from './coinpickermodal';

type PickerTarget = 'top' | 'bottom' | null;

const CryptoTrading: React.FC = () => {
  const { top, bottom } = useSafeAreaInsets();

  const [topCoin, setTopCoin]       = useState<Coin>(COINS['ETH']);
  const [bottomCoin, setBottomCoin] = useState<Coin>(COINS['USDT']);
  const [topAmount, setTopAmount]   = useState<string>('1');
  const [bottomAmount, setBottomAmount] = useState<string>(
    convertBetweenCoins('1', 'ETH', 'USDT'),
  );
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
  const [showSuccess, setShowSuccess]   = useState(false);

  const { valid, estimatedFee, youWillReceive, spread, gasFee } =
    calcTradeDetails(topCoin.symbol, topAmount, bottomCoin.symbol, bottomAmount);

  // ── Amount handlers ──────────────────────────────────────────────────────

  const handleTopChange = useCallback(
    (val: string) => {
      setTopAmount(val);
      setBottomAmount(convertBetweenCoins(val, topCoin.symbol, bottomCoin.symbol));
    },
    [topCoin.symbol, bottomCoin.symbol],
  );

  const handleBottomChange = useCallback(
    (val: string) => {
      setBottomAmount(val);
      setTopAmount(convertBetweenCoins(val, bottomCoin.symbol, topCoin.symbol));
    },
    [topCoin.symbol, bottomCoin.symbol],
  );

  // ── Swap positions ───────────────────────────────────────────────────────

  const handleSwap = useCallback(() => {
    setTopCoin(bottomCoin);
    setBottomCoin(topCoin);
    setTopAmount(bottomAmount);
    setBottomAmount(topAmount);
  }, [topCoin, bottomCoin, topAmount, bottomAmount]);

  // ── Coin selection ───────────────────────────────────────────────────────

  const handleCoinSelected = useCallback(
    (coin: Coin) => {
      if (pickerTarget === 'top') {
        setTopCoin(coin);
        setBottomAmount(convertBetweenCoins(topAmount, coin.symbol, bottomCoin.symbol));
      } else if (pickerTarget === 'bottom') {
        setBottomCoin(coin);
        setBottomAmount(convertBetweenCoins(topAmount, topCoin.symbol, coin.symbol));
      }
      setPickerTarget(null);
    },
    [pickerTarget, topAmount, topCoin.symbol, bottomCoin.symbol],
  );

  // ── Trade action ─────────────────────────────────────────────────────────

  const handleAction = () => {
    if (!valid) return;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  // Exchange rate label
  const rateLabel = `1 ${topCoin.symbol} = ${formatNumber(
    topCoin.priceUSD / bottomCoin.priceUSD,
    topCoin.priceUSD / bottomCoin.priceUSD < 1 ? 6 : 2,
  )} ${bottomCoin.symbol}`;

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

        <View style={styles.body}>
          {/* ── Currency inputs ── */}
          <Currency
            coin={topCoin}
            amount={topAmount}
            onAmountChange={handleTopChange}
            onCoinSelect={() => setPickerTarget('top')}
          />

          <HandlerCurrency onSwap={handleSwap} />

          <Currency
            coin={bottomCoin}
            amount={bottomAmount}
            onAmountChange={handleBottomChange}
            onCoinSelect={() => setPickerTarget('bottom')}
          />

          {/* ── Exchange rate ── */}
          <View style={styles.rateRow}>
            <Text style={styles.rateDot}>◆</Text>
            <Text style={styles.rateText}>{rateLabel}</Text>
            <Text style={styles.rateDot}>◆</Text>
          </View>

          {/* ── Action button ── */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              !valid      && styles.actionButtonDisabled,
              showSuccess && styles.actionButtonSuccess,
            ]}
            onPress={handleAction}
            disabled={!valid}
            activeOpacity={0.85}
          >
            <Text style={[styles.actionButtonText, !valid && styles.actionButtonTextDisabled]}>
              {showSuccess
                ? '✓  Order Placed!'
                : `Swap ${topCoin.symbol} → ${bottomCoin.symbol}`}
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

      {/* ── Coin picker modals ── */}
      <CoinPickerModal
        visible={pickerTarget === 'top'}
        selectedSymbol={topCoin.symbol}
        excludeSymbol={bottomCoin.symbol}
        onSelect={handleCoinSelected}
        onClose={() => setPickerTarget(null)}
      />
      <CoinPickerModal
        visible={pickerTarget === 'bottom'}
        selectedSymbol={bottomCoin.symbol}
        excludeSymbol={topCoin.symbol}
        onSelect={handleCoinSelected}
        onClose={() => setPickerTarget(null)}
      />
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
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
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
  detailsContainer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
});

export default CryptoTrading;