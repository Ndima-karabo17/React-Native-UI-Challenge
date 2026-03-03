import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Coin, CoinSymbol } from './types';
import { COIN_LIST } from './constant';
import { formatNumber } from './utils';

interface CoinPickerModalProps {
  visible: boolean;
  selectedSymbol: CoinSymbol;
  excludeSymbol: CoinSymbol;       // the coin already chosen in the other slot
  onSelect: (coin: Coin) => void;
  onClose: () => void;
}

const CoinPickerModal: React.FC<CoinPickerModalProps> = ({
  visible,
  selectedSymbol,
  excludeSymbol,
  onSelect,
  onClose,
}) => {
  const available = COIN_LIST.filter((c) => c.symbol !== excludeSymbol);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Token</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Coin list */}
          <FlatList
            data={available}
            keyExtractor={(item) => item.symbol}
            renderItem={({ item }) => {
              const isSelected = item.symbol === selectedSymbol;
              const isStable   = item.symbol === 'USDT' || item.symbol === 'USDC';
              return (
                <TouchableOpacity
                  style={[styles.row, isSelected && styles.rowSelected]}
                  onPress={() => { onSelect(item); onClose(); }}
                  activeOpacity={0.7}
                >
                  {/* Icon */}
                  <View style={[styles.icon, { backgroundColor: item.color + '33' }]}>
                    <Text style={[styles.iconText, { color: item.color }]}>
                      {item.symbol.slice(0, 1)}
                    </Text>
                  </View>

                  {/* Name + symbol */}
                  <View style={styles.coinInfo}>
                    <Text style={styles.symbol}>{item.symbol}</Text>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>

                  {/* Balance + price */}
                  <View style={styles.rightCol}>
                    <Text style={styles.balance}>
                      {formatNumber(item.balance, isStable ? 2 : 4)}
                    </Text>
                    <Text style={styles.price}>${formatNumber(item.priceUSD)}</Text>
                  </View>

                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={18} color="#a78bfa" style={{ marginLeft: 8 }} />
                  )}
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#13131f',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    maxHeight: '75%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  rowSelected: {
    backgroundColor: 'rgba(139,92,246,0.08)',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
  coinInfo: {
    flex: 1,
  },
  symbol: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600' as const,
  },
  name: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  balance: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500' as const,
  },
  price: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginHorizontal: 20,
  },
});

export default CoinPickerModal;