const express = require('express')
const argv = require('minimist')(process.argv.slice(2))

const app = express()
const port = argv.p

// parse args
if (port === undefined) {
  console.error('You must specify `-p PORT` arg')
  process.exit(1)
}

let current = 0

app.get('/', (req, res) => {
  current++
  res.json({
    current: current
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}... `)
})