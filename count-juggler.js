const server = require('./server')



server.start(3000)
  .then(() => server.start(4000))
  .then(() => console.log("All server starts"))
  .catch(() => {
    process.exit(1)
    console.error('Shit happens')
  })