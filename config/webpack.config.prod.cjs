const { merge } = require("webpack-merge");
const UserScriptMetaDataPlugin = require("userscript-metadata-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const metadata = require("./metadata.cjs");
const webpackConfig = require("./webpack.config.base.cjs");

const cfg = merge(webpackConfig, {
  mode: "production",
  output: {
    filename: "index.prod.user.js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            // keep userscript meta
            comments: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
  cache: {
    type: "filesystem",
    name: "prod",
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
  ],
});

module.exports = cfg;
