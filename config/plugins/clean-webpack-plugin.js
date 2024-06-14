const fsPromises = require("fs/promises");
const path = require("path");
const chalk = require('chalk')

const myPlugin = "ClearDirectoryWebpackPlugin";
module.exports = class CleanWebpackPlugin {
  constructor(options) {
    if (typeof options === "boolean") {
      this.clean = options;
    } else if (options) {
      const { debug, dry, keep } = options;
      this.debug = debug;
      this.dry = !!dry;
      this.keep = keep;
    }
  }
  apply(compiler) {
    // if use tap function, `_clear` function will be executed after assets emitted,
    // so we need to use tabPromise to promise `_clear` function execution before emit.
    compiler.hooks.shouldEmit.tap(myPlugin, (compilation) => {
      const { outputOptions, assetsInfo } = compilation;
      const absolutePath = outputOptions.path;
      if (this.dry) {
        this._logShouldRemoveFiles(absolutePath, assetsInfo);
      } else {
        this._clean(absolutePath);
      }
      return true
    });
  }
  async _logShouldRemoveFiles(path, assetsInfo) {
    const filenames = [...assetsInfo.keys()];
    const files = await fsPromises.readdir(path, { recursive: true });
    // debugger;
    let i = 1
    console.log(chalk.white.bold('Info, files inside output directory:'))
    for (const file of files) {
      if (!filenames.includes(file)) {
        console.log(`<i> ${chalk.bold.cyan(file)} will be removed\r`);
      }
      if (i++ === files.length)
        console.log()
    }
  }
  async _clean(path) {
    try {
      if (this.debug) {
        return await Promise.reject({
          message: "[CleanWebpackPlugin] Designed error for debug",
        });
      }
      await fsPromises.rm(path, { force: true, recursive: true });
    } catch (error) {
      // @see: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error
      throw error.message;
    }
  }
};
