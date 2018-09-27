const fs = require('fs')

const filePath = '/tmp/count_server.json'

let get = () => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (error, content) => {
    if (error) {
      return reject(error)
    }
    let data = {}

    if (content != "") {
      data = JSON.parse(content)
    }

    return resolve(data)
  });
})



let save = (value) => new Promise((resolve, reject) => {
  let valueStr = JSON.stringify(value)
  fs.writeFile(filePath, valueStr, (error) => {
    if (error) {
      return reject(error)
    }
    resolve(value)
  });
})

/**
 * Create the database if not exists
 * @return {Promise}
 */
let init = () => new Promise((resolve, reject) => {
  fs.stat(filePath, (error, fstat) => {
    if (error) {
      if (error.code === 'ENOENT') {
        save({})
        resolve(true)
      }

      return reject(error)
    }
    resolve(true)
  });
})

/**
 * Increment the given port on the database
 * @param  {string} port
 * @return {Promise}
 */
let incrementPort = (port) => new Promise((resolve, reject) => {
  init()
    .then(() => get())
    // increment then save
    .then((counts) => {
      let countPort = counts[port]

      if (countPort === undefined) {
        counts[port] = 1
      } else {
        counts[port] = countPort + 1
      }

      return save(counts)
    }).then((counts) => {
      return resolve(counts)
    })
    .catch((error) => reject(error))

})

module.exports = {
  get: get,
  save: save,
  incrementPort: incrementPort
}