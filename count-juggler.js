const fetch = require('node-fetch')
const server = require('./server')



server.start(3000)
  .then(() => server.start(4000))
  .then(() => {
    console.log("All server starts")

    setInterval(() => {

      fetch(`http://localhost:3000/api`)
        .then(res => res.json())
        .then(json => console.log("3000: " + JSON.stringify(json)))
        .catch((e) => console.error(e))

      fetch(`http://localhost:4000/api`)
        .then(res => res.json())
        .then(json => console.log("4000: " + JSON.stringify(json)))
        .catch((e) => console.error(e))

    }, 1000)
  })
  .catch(() => {
    process.exit(1)
    console.error('Shit happens')
  })