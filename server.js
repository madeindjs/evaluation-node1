const express = require('express')
const database = require('./save-count')
const bodyParser = require('body-parser')


module.exports.start = (port) => new Promise((resolve, reject) => {
  const app = express()
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
    resolve(app)
  })
})