// DON'T remove it, because MyChalk has a dependency of it.
const chalk = require("chalk");

/**
 * A utility for resolving console.log with chalk style
 *
 * @example myChalk.red.bold.italic.log("Red-Bold-Italic Text")
 * @example myChalk.red.bold.italic.set("Red-Bold-Italic Text")
 */
class MyChalk {
  constructor() {
    const that = this;
    this.chalk = `chalk`;
    let proxyThis;
    return (proxyThis = new Proxy(this, {
      get(target, prop, receiver) {
        switch (prop) {
          case "log":
            return that.log;
          case "set":
            return that.set;
          case "chalk":
            // for exclude chalk property of `this.chalk` execution
            return that.chalk;
          default:
            that.chalk += `["${prop}"]`;
        }
        return proxyThis;
      },
    }));
  }
  log(...args) {
    console.log(eval(`${this.chalk}("${args}")`));
  }
  set(...args) {
    return eval(`${this.chalk}("${args}")`);
  }
}

module.exports = MyChalk;

// Test examples
// const myChalk = new MyChalk();
// console.log(chalk['red']['bgGreen']('666'));
// console.log(
//   myChalk.red.bold.set("555", "666"),
//   myChalk.yellow.bold.set("888")
// );
// myChalk.cyan.bold.log("888");
