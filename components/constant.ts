import { Coin, CoinSymbol } from './types';

export const FEE_RATE = 0.00098; // ~0.098%
export const SPREAD   = 0.002;   // 0.2%
export const GAS_FEE_USD = 4.28;

export const COINS: Record<CoinSymbol, Coin> = {
  BTC:  { symbol: 'BTC',  name: 'Bitcoin',  balance: 0.4821,    priceUSD: 67432.50, color: '#F7931A' },
  ETH:  { symbol: 'ETH',  name: 'Ethereum', balance: 293.0187,  priceUSD: 3461.02,  color: '#a78bfa' },
  SOL:  { symbol: 'SOL',  name: 'Solana',   balance: 142.75,    priceUSD: 182.34,   color: '#9945FF' },
  BNB:  { symbol: 'BNB',  name: 'BNB',      balance: 18.33,     priceUSD: 608.71,   color: '#F0B90B' },
  USDT: { symbol: 'USDT', name: 'Tether',   balance: 12987.21,  priceUSD: 1.00,     color: '#26A17B' },
  USDC: { symbol: 'USDC', name: 'USD Coin', balance: 5430.00,   priceUSD: 1.00,     color: '#2775CA' },
};

export const COIN_LIST = Object.values(COINS);

/** Convert amount of fromCoin into toCoin */
export function convertBetweenCoins(
  amount: string,
  from: CoinSymbol,
  to: CoinSymbol,
): string {
  const num = parseFloat(amount);
  if (isNaN(num) || amount === '') return '';
  const usdValue = num * COINS[from].priceUSD;
  return (usdValue / COINS[to].priceUSD).toFixed(6);
}