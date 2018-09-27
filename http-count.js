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

// setup express
app.use(express.static('public'));
app.set('view engine', 'pug');




let current = 0

app.get('/', (req, res) => {

  let counts = database.get()
    .then((counts) => {
      console.log(counts)
      res.render('index', {
        title: 'Evaluation',
        current: current,
        total: counts[port]
      });
    }).catch(() => {
      res.statusCode = 500;
      res.json({
        error: error,
      })
    })


})

app.get('/count', (req, res) => {
  current++

  database.incrementPort(port)
    .then((counts) => {
      res.json({
        current: current,
        total: counts[port]
      })
    })
    .catch((error) => {
      res.statusCode = 500;
      res.json({
        error: error,
      })
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}... `)
})