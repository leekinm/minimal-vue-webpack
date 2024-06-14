const fs = require("fs");
const path = require("path");
const { ConcatSource } = require("webpack-sources");
const pluginName = "RemoveCommentWebpackPlugin";

module.exports = class RemoveCommentWebpackPlugin {
  apply(compiler) {
    // executing before preparing to read `records`
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log();
      console.log("- RemoveCommentWebpackPlugin is running");
      console.log();
    });

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          Object.entries(assets).forEach(([pathname, source]) => {
            const sources = source.source();

            // these insertions for before and after will be placed in the most front of source by terser plugin.
            // but why?
            const concatenatedSource = new ConcatSource(
              `function abcdefghijklm() {console.log("ABCDEFGHIJKLM")}`,
              sources,
              `function nopqrstuvwxyz() {console.log("NOPQRSTUVWXYZ")}`
            );
            assets[pathname] = concatenatedSource;
          });
        }
      );
    });
  }
  removeComment(source) {
    return source.replace(/\/\*[\s\S]*?\*\//g, "");
  }
};
