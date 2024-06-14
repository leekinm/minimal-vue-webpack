const chalk = require('chalk')

class ChalkLog {
  constructor() {
    console.log(32323);
    const that = this
    this.chalk = `chalk`
    const proxyThis = new Proxy(this, {
      get(target, prop, receiver) {
        console.log('Prop: ', prop)
        if (prop === 'log') {
          return that.log
        } else if (prop === 'chalk') {
          return that.chalk
        } else {
          that.chalk += `["${prop}"]`
        }
        return proxyThis
      }
    })
    return proxyThis
  }
  log(...args) {
    console.log(eval(`${this.chalk}(args)`))
    new ChalkLog()
  }
}

module.exports = new ChalkLog()

const chalkLog = new ChalkLog()
// const chalkLog = new ChalkLog()
// console.log(eval(`chalk['red']['bgGreen']('666')`))
// console.log(chalk['red']['bgGreen']('666'));
console.log(chalkLog.red.bold.log('555', chalkLog.yellow.bold.log('888')))

