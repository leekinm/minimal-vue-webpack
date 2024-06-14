const path = require("path");

const rootDir = path.resolve(__dirname, "..");

module.exports = {
  mode: "development",
  devServer: {
    static: {
      // static files, such as HTML
      directory: path.resolve(rootDir, "public"),
    },
    port: 9000, // local server port
    compress: true, // for assets compress
    hot: true, // for HMR
  },
  plugins: [],
};
