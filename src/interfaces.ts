import { constants } from "./constants";

export type CurrencyCode = typeof constants.CURRENCY_CODES[number];

export interface FactionDigits {
  min: number;
  max: number;
}

export interface Currency {
  code: CurrencyCode;
  pattern: RegExp;
  decimalSeparator: string;
  groupSeparator: string;
  fractionDigits: FactionDigits;
}

export interface ExchangeRate {
  code: CurrencyCode;
  rate: number;
}

export interface AppData {
  exchangeRates?: ExchangeRate[];
  targetCurrency?: CurrencyCode;
  lastUpdate: number;
  updateRate: number;
}
