export type CoinType = 'ETH' | 'USD';

export interface CurrencySectionProps {
  coin: CoinType;
  amount: string;
  balance: number;
  onAmountChange: (value: string) => void;
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