const glob = require('glob')

const pagesDir = './src/client/static/data/'

const routes = glob.sync(`${pagesDir}**/*.json`)
  .map(path => path.replace(pagesDir, ''))
  .map(path => path.replace('index.json', ''))
  .map(path => path.replace('.json', '/'))

module.exports = routes
