# SteamCurrencyConverter (SCC)

This is a userscript that converts the currency of the Steam store to your currency of choice.

## ⚠️ Disclaimer

-   SCC is **not affiliated with Valve** in any way. Use at your own risk.
-   SCC converts the currency of the Steam store to your currency of choice. **It does not change the currency of your Steam wallet**. If you buy something, you will still be charged in your steam store's currency. Use it only to get an idea of the price of the game in the currency you are most familiar with.
-   SCC converts all prices on the store page. This **includes prices in the cart or on the checkout page**. Even if new exchange rates are fetched daily, **the exchange rates may be outdated.**

## How to use

1. Install a userscript manager. I recommend [Tampermonkey](https://www.tampermonkey.net/).
2. Click on [index.prod.user.js](/dist/index.prod.user.js) and install it.
3. Reload the Steam store page. You should see the modal window below.

<p align="center">
  <img src="https://i.imgur.com/H5UsHV1.png" width="500">
</p>

4. Select your currency in the modal window.
5. Click "Save".

The page will reload and the prices will be converted to your currency.

## Development

1. Allow Tampermonkey's access to local file URIs [tampermonkey/faq](https://tampermonkey.net/faq.php?ext=dhdg#Q204)
2. Install deps with `npm i` or `npm ci`.
3. `npm run dev` to start your development.

Now you will see 2 files in `./dist/`

-   `dist/index.dev.user.js`: **You should install this userscript in your browser.** It's a simple loader that loads `dist/index.debug.js` on matched web page.
-   `dist/index.debug.js`: This is the development build with `eval-source-map`. It will be automatically loaded by `dist/index.dev.user.js` via `@require file://.../dist/index.debug.js` metadata. **Don't add it to your userscript manager.**

Livereload is enabled by default, use [this Chrome extension](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei).

### NOTICE

Everytime you change your metadata config, you'll have to restart webpack server and install the newly generated `dist/index.dev.user.js` userscript in your browser again.

Just install the packages with npm and import them in your code, webpack will take care of the rest.

## Build

```bash
npm run build
```

A userscript file will be generated in `./dist/` folder. You can install it in your browser.

## Credits

Thanks to [Trim21](https://github.com/Trim21/webpack-userscript-template) for the userscript template.  
Thanks to [fawazahmed0](https://github.com/fawazahmed0/currency-api) for the currency API.
