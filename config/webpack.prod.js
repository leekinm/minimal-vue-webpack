const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin");
const RemoveCommentWebpackPlugin = require("./plugins/remove-comment-webpack-plugin.js");

const rootDir = path.resolve(__dirname, "..");

module.exports = {
  mode: "production",
  output: {
    path: path.join(rootDir, "dist"),
    filename: "[name].[contenthash:4].js",
    // clean: {
    //   dry: true,
    // },
    // clean: true, // for clean output directory before assets emit
  },
  plugins: [
    // new RemoveCommentWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({ dry: true }),
  ],
  optimization: {
    moduleIds: 'deterministic' // for content didn't changed, contenthash will also not changed.
  },
};
