const path = require('path')
const fetch = require('node-fetch')

const locales = ['nl', 'en']
const layoutRegex = new RegExp(`(${locales.join('|')})/layouts/`)
const localesRegex = new RegExp(`(${locales.join('|')})`)

export function getData(route, variables) {
  let queryPath
  const clientPath = process.client ? '..' : 'src/client'

  if (route.match(layoutRegex)) {
    queryPath = path.join(clientPath, 'layouts', route.replace(layoutRegex, '') + '.query.graphql')
  } else {
    queryPath = path.join(clientPath, 'pages', route.replace(localesRegex, '_locale'), 'index.query.graphql')
  }

  const query = process.client ? require(queryPath) : require('fs').readFileSync(queryPath, 'utf8')

  if (process.env.NODE_ENV !== 'production') {
    return fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.DATO_API_TOKEN}`,
        },
        body: JSON.stringify({ query, variables })
      }
    )
      .then(res => res.json())
      .then(res => res.data)
  } else {
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
}
