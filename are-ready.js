const isReady = require('./is-ready')
const path = require('path')

const nodeModulePath = path.resolve(__dirname, 'node_modules')
isReady.run(nodeModulePath)
  .then(() => console.log(`${nodeModulePath} exists`))
  .catch(() => console.error(`${nodeModulePath} exists`))


const readmePath = path.resolve(__dirname, 'README.md')
isReady.run(readmePath)
  .then(() => console.log(`${readmePath} exists`))
  .catch(() => console.error(`${readmePath} exists`))