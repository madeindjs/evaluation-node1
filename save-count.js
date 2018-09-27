const fs = require('fs')

const filePath = '/tmp/count_server.txt'

module.exports.get = () => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (error, content) => {
    if (error) {
      return reject(error)
    }

    let int = parseInt(content)
    if (int > 0) {
      return resolve(int)
    }
    return resolve(0)
  });
})

module.exports.save = (value) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, value, (error) => {
    if (error) {
      return reject(error)
    }

    return resolve(true)
  });
})