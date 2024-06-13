const path = require("path");
const { merge } = require("webpack-merge");

const webpackConfigDev = require("./webpack.dev.js");
const webpackConfigProd = require("./webpack.prod.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const rootDir = path.resolve(__dirname, "..");
const isProd = process.env.NODE_ENV === "production";

module.exports = merge(isProd ? webpackConfigProd : webpackConfigDev, {
  entry: path.join(rootDir, "src/main.js"),
  module: {
    rules: [
      {
        test: /.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.less$/i,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(rootDir, "public/index.html"),
    }),
  ],
});
