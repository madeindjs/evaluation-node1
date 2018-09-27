const express = require('express')
const argv = require('minimist')(process.argv.slice(2))
const database = require('./save-count')
const bodyParser = require('body-parser')

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
//configure body-parser for express
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

let current = 0

app.get('/', (req, res) => {

  current++
  database.incrementPort(port)
    .then((counts) => {
      res.render('index', {
        title: 'Evaluation',
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

app.get('/api', (req, res) => {

  database.get()
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

app.post('/reset', (req, res) => {

  if (req.body.current !== undefined) {
    current = 0
    console.log('Count cleaned')
  }

  if (req.body.all_time !== undefined) {
    database.save({})
      .then(() => console.log('All time count cleaned'))
      .catch(() => conole.error('Cannot save all time'))
  }

  res.redirect('/');
})


app.listen(port, () => {
  console.log(`Listening on port ${port}... `)
})