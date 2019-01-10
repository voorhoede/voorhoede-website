const path = require('path')

export default function getData(route) {
  const filepath = path.join('/data', route, 'index.json')
  if (process.client) {
    // On client load over http
    return fetch(filepath).then(res => res.json())
  } else {
    // On server load from file system
    const data = JSON.parse(require('fs').readFileSync(`src/client/static${filepath}`, 'utf8'))
    return Promise.resolve(data)
  }
}
