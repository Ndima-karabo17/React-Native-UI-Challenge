import { CoinType, TradeDetails } from './types';
import { ETH_TO_USD, FEE_RATE, SPREAD, GAS_ETH } from './constant';

export function formatNumber(n: number | string, decimals = 2): string {
  if (isNaN(Number(n)) || n === '') return '';
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Convert an amount from one coin to the other. */
export function convertAmount(value: string, fromCoin: CoinType): string {
  const num = parseFloat(value);
  if (isNaN(num) || value === '') return '';
  return fromCoin === 'ETH'
    ? (num * ETH_TO_USD).toFixed(2)
    : (num / ETH_TO_USD).toFixed(6);
}

/** Derive all trade detail rows from current state. */
export function calcTradeDetails(
  topCoin: CoinType,
  topAmount: string,
  bottomAmount: string,
): TradeDetails {
  const isBuying  = topCoin === 'USD';
  const ethAmount = topCoin === 'ETH' ? parseFloat(topAmount) : parseFloat(bottomAmount);
  const usdAmount = topCoin === 'USD' ? parseFloat(topAmount) : parseFloat(bottomAmount);
  const valid     = !isNaN(ethAmount) && ethAmount > 0;

  return {
    valid,
    estimatedFee:    valid ? `$${(usdAmount * FEE_RATE).toFixed(2)}` : '—',
    youWillReceive:  valid
      ? isBuying
        ? `${(ethAmount * (1 - SPREAD)).toFixed(6)} ETH`
        : `$${formatNumber(usdAmount * (1 - SPREAD))}`
      : '—',
    spread:  '0.2%',
    gasFee:  valid ? `${GAS_ETH} ETH` : '—',
  };
}

/** Small hint shown below the amount input. */
export function getConversionHint(coin: CoinType, amount: string): string {
  const num = Number(amount);
  if (amount === '' || isNaN(num)) return 'Enter amount';
  return coin === 'ETH'
    ? `≈ $${formatNumber(num * ETH_TO_USD)}`
    : `≈ ${formatNumber(num / ETH_TO_USD, 6)} ETH`;
}