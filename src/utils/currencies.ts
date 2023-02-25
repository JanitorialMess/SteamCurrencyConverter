import GM_fetch from "@trim21/gm-fetch";
import { constants } from "../constants";
import { AppData, Currency, CurrencyCode, ExchangeRate } from "../interfaces";
import { logger } from "./logger";

async function fetchWithFallback(
  urls: string | string[],
  obj: RequestInit = {}
) {
  let response;

  for (let url of [].concat(urls)) {
    try {
      logger.info(`fetching exchange rate from ${url}`);
      response = await GM_fetch(url, obj);
      if (response.ok) return response;
    } catch (e) {}
  }

  return response;
}

export async function getExchangeRates(targetCurrency: CurrencyCode) {
  const _targetCurrency = targetCurrency.toLowerCase();
  const exchangeRates: ExchangeRate[] = [];
  const response = await fetchWithFallback(
    [
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${_targetCurrency}.min.json`,
      `https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/${_targetCurrency}.min.json`,
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${_targetCurrency}.json`,
      `https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/${_targetCurrency}.json`,
    ],
    {}
  );
  const data = await response.json();

  exchangeRates.push(
    ...Object.keys(data[_targetCurrency])
      .filter((currency) =>
        constants.CURRENCIES.find(
          (c) => c.code.toLowerCase() === currency.toLowerCase()
        )
      )
      .map((currency) => ({
        code: currency.toUpperCase() as CurrencyCode,
        rate: 1 / parseFloat(data[_targetCurrency][currency]),
      }))
  );

  return exchangeRates;
}

function convertCurrency(
  price: string,
  currentCurrency: Currency,
  appData: AppData
): string {
  const index = appData.exchangeRates.findIndex(
    (item: ExchangeRate) => item.code === currentCurrency.code
  );
  if (index === -1) {
    throw new Error(
      `currency ${currentCurrency.code} not found in exchange rates`
    );
  }

  const targetCurrency = appData.exchangeRates[index];

  price = price
    .replace(currentCurrency.groupSeparator, "")
    .replace(currentCurrency.decimalSeparator, ".");

  const conversionRate = targetCurrency.rate;
  let convertedPrice = parseFloat(price) * conversionRate;

  return convertedPrice.toLocaleString("pl-PL", {
    style: "currency",
    currency: appData.targetCurrency,
    minimumFractionDigits: currentCurrency.fractionDigits.min,
    maximumFractionDigits: currentCurrency.fractionDigits.max,
  });
}

export function updatePrice(
  textNode: Node,
  currentCurrency: Currency,
  appData: AppData
) {
  textNode.nodeValue = textNode.nodeValue.replace(
    currentCurrency.pattern,
    (_, price) => convertCurrency(price, currentCurrency, appData)
  );
}
