const path = require("path");
const { merge } = require("webpack-merge");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfigDev = require("./webpack.dev.js");
const webpackConfigProd = require("./webpack.prod.js");

const rootDir = path.resolve(__dirname, "..");
const isProd = process.env.NODE_ENV === "production";

const plugins = isProd ? webpackConfigProd.plugins : webpackConfigDev.plugins;

const config = merge(isProd ? webpackConfigProd : webpackConfigDev, {
  entry: path.join(rootDir, "src/main.js"),
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.less$/i,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  // `webpack-merge` doesn't merge multiple plugins,
  // its behavior likes `Object.assign`.
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(rootDir, "public/index.html"),
    }),
  ].concat(plugins),
});

module.exports = config;
