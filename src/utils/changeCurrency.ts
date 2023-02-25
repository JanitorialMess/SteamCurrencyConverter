import { constants } from "../constants";
import { logger } from "./logger";
import storageWrapper from "./storageWrapper";

export async function injectChangeCurrencyBtn() {
  const handleButtonInjection = (event: CustomEvent) => {
    logger.info("injected change currency button");
    const actionMenu = event.detail.target;
    const observer = event.detail.observer;

    const clearButton = document.createElement("a");
    clearButton.classList.add("global_action_link");
    clearButton.style.cssText = "vertical-align: middle; cursor: pointer;";
    const clearButtonText = document.createTextNode("Change Target Currency");
    clearButton.appendChild(clearButtonText);

    clearButton.addEventListener("click", async () => {
      await storageWrapper.delete("appData");
      location.reload();
    });

    // Disconnect observer
    observer.disconnect();
    actionMenu.prepend(clearButton);
    // Reconnect observer
    observer.observe(document, constants.OBSERVER_CONFIG);
  };

  document.addEventListener("globalActionMenuFound", handleButtonInjection, {
    once: true,
  });
}
