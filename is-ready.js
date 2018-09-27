const fs = require('fs')
const chalk = require('chalk')

/**
 * Check if given path exists or not
 * @param  {String} pathname
 * @return {Promise}
 */
module.exports.run = (pathname) => new Promise((resolve, reject) => {
  fs.stat(pathname, (error, fstat) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // file not exists
        console.error(chalk.red('not ready'))
      } else {
        // other thing
        console.error(chalk.red('Shit happens... '))
        console.error(error)
      }
      return reject(false)
    }
    // file exists
    console.log(chalk.yellow('maybe'))
    return resolve(true)
  });

})