const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

const nodeModulePath = path.resolve(__dirname, 'node_modules')


fs.stat(nodeModulePath, (error, fstat) => {
  if (error) {
    if (error.code === 'ENOENT') {
      // file not exists
      console.error(chalk.red('not ready'))
    } else {
      // other thing
      console.error(chalk.red('Shit happens... '))
      console.error(error)
    }
    return process.exit(255)
  }
  // file exists
  console.log(chalk.yellow('maybe'))
  return process.exit(0)
});