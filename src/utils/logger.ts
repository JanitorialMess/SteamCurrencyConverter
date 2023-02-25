const appName = "SteamCurrencyConverter";

export const logger = {
  log: (...args: any) => {
    console.log(`[${appName}] log:`, ...args);
  },
  error: (...args: any) => {
    console.error(`[${appName}] error:`, ...args);
  },
  info: (...args: any) => {
    console.info(`[${appName}] info:`, ...args);
  },
  warn: (...args: any) => {
    console.warn(`[${appName}] warn:`, ...args);
  },
};
