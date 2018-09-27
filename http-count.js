const argv = require('minimist')(process.argv.slice(2))

const server = require('./server')


const port = argv.p

// parse args
if (port === undefined) {
  console.error('You must specify `-p PORT` arg')
  process.exit(1)
}

server.start(port)