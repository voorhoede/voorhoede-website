const glob = require('glob')

const pagesDir = './src/client/static/data/pages/'

const routes = glob.sync(`${pagesDir}**/index.json`)
  .map(path => path.replace(pagesDir, '/'))
  .map(path => path.replace('index.json', '/'))

module.exports = routes
