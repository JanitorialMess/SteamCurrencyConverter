import { constants } from "../constants";
import { CurrencyCode } from "../interfaces";

async function isDialogReady(): Promise<boolean> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (
        typeof unsafeWindow.ShowPromptDialog === "function" &&
        typeof unsafeWindow.jQuery === "function"
      ) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
  });
}

export async function promptCurrencyDialog(): Promise<CurrencyCode | null> {
  const dialogReady = await isDialogReady();

  return new Promise(function (resolve, reject) {
    if (!dialogReady) {
      reject("dialog not ready");
    }

    const dialog = unsafeWindow.ShowPromptDialog(
      "Select Currency",
      "Select the currency you want to use for prices",
      "Save",
      "Cancel"
    );
    const currencyCodes = constants.CURRENCY_CODES;
    const HTMLCurrencyOptions = currencyCodes
      .map(
        (currencyCode) =>
          '<option style="color:#BFBFBF">' + currencyCode + "</option>"
      )
      .join("");
    const HTMLSelect = `<select style="outline:none; background: #1e2226; border:1px solid #000; box-shadow:1px 1px 0 0 rgba(91, 132, 181, 0.2); font-size:13px; color:#BFBFBF; width:100%;" onchange="this.parentNode.querySelector(\'input\').value = this.value"><option value="" style="color:#BFBFBF" >Select...</option>${HTMLCurrencyOptions}</select>`;

    jQuery("input", dialog.m_$StandardContent)
      .css("display", "none")
      .after(HTMLSelect);
    dialog.done((currencyCode: CurrencyCode) => {
      resolve(currencyCode);
    });
  });
}
