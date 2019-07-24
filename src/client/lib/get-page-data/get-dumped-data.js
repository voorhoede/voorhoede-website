import path from 'path'

export default function ({ route }) {
  const filePath = path.join(route.path, 'index.json')

  if (process.client) {
    // On client load over http
    return import(/* webpackChunkName: "pageData" */ `../../static/data${filePath}`)
      .then(module => module.default)
      // Hard navigation, to trigger offline page in PWA
      .catch(() => window.location = route.path)
  } else {
    // On server load from file system
    const data = JSON.parse(require('fs').readFileSync(`src/client/static/data${filePath}`, 'utf8'))
    return Promise.resolve(data)
  }
}
