import { Currency, FactionDigits } from "./interfaces";

const UPDATE_RATE = 12 * 3600 * 1000;
const CURRENCY_CODES = [
  "ARS",
  "AUD",
  "BGN",
  "BRL",
  "BTC",
  "CAD",
  "CHF",
  "CLP",
  "CNY",
  "CZK",
  "DKK",
  "EGP",
  "EUR",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NAD",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "TWD",
  "UAH",
  "XAG",
  "XAU",
  "XDR",
  "XPD",
  "XPT",
  "ZAR",
  "USD",
] as const;

const OBSERVER_CONFIG = {
  attributes: false,
  childList: true,
  subtree: true,
  characterData: true,
};

const fractionDigits: FactionDigits = {
  min: 2,
  max: 2,
};

const ArgentinePeso: Currency = {
  code: "ARS",
  pattern: /ARS\$\s*([0-9.,]+)/gim,
  groupSeparator: ".",
  decimalSeparator: ",",
  fractionDigits,
};

const BrazilianReal: Currency = {
  code: "BRL",
  pattern: /R\$\s*([0-9.,]+)/gim,
  groupSeparator: ".",
  decimalSeparator: ",",
  fractionDigits,
};

const TurkishLira: Currency = {
  code: "TRY",
  pattern: /([0-9.,]+)\sTL/gim,
  groupSeparator: ".",
  decimalSeparator: ",",
  fractionDigits,
};

const RussianRuble: Currency = {
  code: "RUB",
  pattern: /([0-9.,]+)\spуб./gim,
  groupSeparator: ".",
  decimalSeparator: ",",
  fractionDigits,
};

const CURRENCIES: Currency[] = [
  ArgentinePeso,
  BrazilianReal,
  TurkishLira,
  RussianRuble,
];

export const constants = {
  UPDATE_RATE,
  CURRENCY_CODES,
  CURRENCIES,
  OBSERVER_CONFIG,
};
