export type CoinSymbol = 'BTC' | 'ETH' | 'SOL' | 'BNB' | 'USDT' | 'USDC';

export interface Coin {
  symbol: CoinSymbol;
  name: string;
  balance: number;
  priceUSD: number;   // price in USD
  color: string;      // accent color for icon
}

export interface CurrencySectionProps {
  coin: Coin;
  amount: string;
  onAmountChange: (value: string) => void;
  onCoinSelect: () => void;
}

export interface HandlerCurrencyProps {
  onSwap: () => void;
}

export interface DetailsRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface TradeDetails {
  estimatedFee: string;
  youWillReceive: string;
  spread: string;
  gasFee: string;
  valid: boolean;
}