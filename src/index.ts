import storageWrapper from "./utils/storageWrapper";
import { constants } from "./constants";
import { AppData } from "./interfaces";
import { logger } from "./utils/logger";
import { promptCurrencyDialog } from "./utils/dialog";
import { getExchangeRates, updatePrice } from "./utils/currencies";
import { scanDOM } from "./utils/domScan";
import { injectChangeCurrencyBtn } from "./utils/changeCurrency";

async function updateAppData(appData: AppData) {
  logger.info("updating exchange rates");
  const exchangeRates = await getExchangeRates(appData.targetCurrency);

  if (!exchangeRates) {
    logger.error("no exchange rates");
  }
  appData.exchangeRates = exchangeRates;
  appData.lastUpdate = Date.now();
}

async function getAppData(): Promise<AppData> {
  let appData: AppData | null = await storageWrapper.get("appData");

  if (appData) {
    if (Date.now() - appData.lastUpdate > constants.UPDATE_RATE) {
      logger.info("updating exchange rates");
      await updateAppData(appData);
      await storageWrapper.set("appData", appData);
    }
    return appData;
  }

  let targetCurrency = await promptCurrencyDialog();
  logger.info(`target currency is set to ${targetCurrency}`);
  if (!targetCurrency) {
    logger.error("no currency code");
    return;
  }

  appData = {
    targetCurrency,
    lastUpdate: Date.now(),
    updateRate: constants.UPDATE_RATE,
  };

  await updateAppData(appData);
  await storageWrapper.set("appData", appData);

  // force refresh page to update prices
  logger.info("refreshing page");
  location.reload();

  return appData;
}

async function main() {
  let priceNodes: Node[] = [];

  // Start DOMScanner
  await scanDOM(priceNodes);

  // Listen for currency change
  getAppData().then((appData) => {
    logger.info("appData", appData);
    const processPriceNodes = (event: CustomEvent) => {
      // Convert all queued price nodes
      let currentCurrency = event.detail;

      let i = priceNodes.length;
      while (i--) {
        updatePrice(priceNodes[i], currentCurrency, appData);
        priceNodes.splice(i, 1);
      }
    };
    document.addEventListener("priceNodesAdded", processPriceNodes);
  });

  await injectChangeCurrencyBtn();
}

main().catch((e) => {
  logger.error(e);
});
