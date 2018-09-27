const isReady = require('./is-ready')

const path = require('path')
const nodeModulePath = path.resolve(__dirname, 'node_modules')

isReady.run(nodeModulePath)
  .then(() => console.log('good promise'))
  .catch(() => console.error('bad promise'))