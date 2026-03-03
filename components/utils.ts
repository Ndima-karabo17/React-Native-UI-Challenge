import { CoinSymbol, TradeDetails } from './types';
import { COINS, FEE_RATE, SPREAD, GAS_FEE_USD } from './constant';

export function formatNumber(n: number | string, decimals = 2): string {
  if (isNaN(Number(n)) || n === '') return '';
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCoinAmount(amount: number, symbol: CoinSymbol): string {
  // Stablecoins show 2dp, others show up to 6dp
  const isStable = symbol === 'USDT' || symbol === 'USDC';
  return isStable ? amount.toFixed(2) : amount.toFixed(6).replace(/\.?0+$/, '');
}

/** USD value of an amount of a given coin */
export function toUSD(amount: string, symbol: CoinSymbol): number {
  const num = parseFloat(amount);
  return isNaN(num) ? 0 : num * COINS[symbol].priceUSD;
}

/** Conversion hint shown below input */
export function getConversionHint(amount: string, fromSymbol: CoinSymbol, toSymbol: CoinSymbol): string {
  const num = parseFloat(amount);
  if (!amount || isNaN(num)) return 'Enter amount';
  const usd = num * COINS[fromSymbol].priceUSD;
  return `≈ $${formatNumber(usd)} USD`;
}

export function calcTradeDetails(
  topSymbol: CoinSymbol,
  topAmount: string,
  bottomSymbol: CoinSymbol,
  bottomAmount: string,
): TradeDetails {
  const topNum = parseFloat(topAmount);
  const valid  = !isNaN(topNum) && topNum > 0;
  const usdValue = valid ? topNum * COINS[topSymbol].priceUSD : 0;

  const receiveNum = parseFloat(bottomAmount);
  const receiveAfterSpread = valid && !isNaN(receiveNum)
    ? receiveNum * (1 - SPREAD)
    : 0;

  return {
    valid,
    estimatedFee:   valid ? `$${(usdValue * FEE_RATE).toFixed(2)}` : '—',
    youWillReceive: valid
      ? `${formatCoinAmount(receiveAfterSpread, bottomSymbol)} ${bottomSymbol}`
      : '—',
    spread:  '0.2%',
    gasFee:  valid ? `$${GAS_FEE_USD.toFixed(2)}` : '—',
  };
}