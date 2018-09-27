const isReady = require('./is-ready')


isReady.run()
  .then(() => console.log('good promise'))
  .catch(() => console.log('bad promise'))