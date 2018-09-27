const express = require('express')
const argv = require('minimist')(process.argv.slice(2))
const database = require('./save-count')


const app = express()
const port = argv.p

// parse args
if (port === undefined) {
  console.error('You must specify `-p PORT` arg')
  process.exit(1)
}

let current = 0

app.get('/count', (req, res) => {
  current++

  let total = 0
  // fetch value
  database.get()
    // get value
    .then((totalCount) => {
      total = totalCount + 1
      // write value
      database.save(total)
    })
    .catch((error) => {
      if (error.code == 'ENOENT') {
        // create file if not exists
        database.save(total)
      } else {
        throw "Could not init file"
      }
    })
    // render json
    .then(() => {
      res.json({
        current: current,
        total: total
      })
    })
    // shit happens ...
    .catch((error) => {
      console.error('Could not read or write database' + error)
      process.exit(1)
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}... `)
})