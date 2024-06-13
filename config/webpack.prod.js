const path = require("path");

const rootDir = path.resolve(__dirname, "..");

module.exports = {
  mode: "production",
  output: {
    path: path.join(rootDir, "dist"),
  },
};
