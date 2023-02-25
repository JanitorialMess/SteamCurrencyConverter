const {
  author,
  dependencies,
  repository,
  version,
} = require("../package.json");

module.exports = {
  name: {
    "": "Steam Currency Converter",
  },
  description: "Converts prices to your currency of choice.",
  namespace: "https://github.com/CoronaBringer/SteamCurrencyConverter",
  version: version,
  author: author,
  source: repository.url,
  license: "MIT",
  match: ["*://store.steampowered.com/*", "*://steamcommunity.com/*"],
  require: [],
  grant: ["GM.xmlHttpRequest", "GM.getValue", "GM.setValue", "GM.deleteValue"],
  connect: ["cdn.jsdelivr.net", "raw.githubusercontent.com"],
  "run-at": "document-start",
  downloadURL:
    "https://raw.githubusercontent.com/CoronaBringer/SteamCurrencyConverter/main/dist/index.prod.user.js",
  updateURL:
    "https://raw.githubusercontent.com/CoronaBringer/SteamCurrencyConverter/main/dist/index.prod.user.js",
  homepageURL: "https://github.com/CoronaBringer/SteamCurrencyConverter",
  supportURL: "https://github.com/CoronaBringer/SteamCurrencyConverter/issues",
};
