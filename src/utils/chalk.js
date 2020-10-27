const chalk = require('chalk')

chalk.level = 1

// 通过引入 chalk 直接扩展 console 实例的属性
console = {
  ...console,
  red: (txt) => console.log(chalk.red(txt)),
  green: (txt) => console.log(chalk.green(txt)),
  blue: (txt) => console.log(chalk.blue(txt)),
  yellow: (txt) => console.log(chalk.yellow(txt)),
  cyan: (txt) => console.log(chalk.cyan(txt)),
}