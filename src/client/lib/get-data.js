const path = require('path')
const fetch = require('node-fetch')

const clientPath = './src/client'
const locales = ['nl', 'en']
const layoutRegex = new RegExp(`(${locales.join('|')})/layouts/`)
const localesRegex = new RegExp(`(${locales.join('|')})`)

export function getData(route, variables) {
  let queryPath

  if (route.match(layoutRegex)) {
    queryPath = clientPath + '/layouts' + route.replace(layoutRegex, '') + '.query.graphql'
  } else {
    queryPath = clientPath + route.replace(localesRegex, '_locale') + 'index.query.graphql'
  }

  console.log({ queryPath });

  // const query = require(queryPath)

  // const query = require('../')
  console.log({ route, queryPath })
  const filepath = path.join('/data', route, 'index.json')
  if (process.client) {
    // On client load over http
    return fetch(filepath).then(res => res.json())
  } else {
    // On server load from file system
    const data = JSON.parse(require('fs').readFileSync(`src/client/static${filepath}`, 'utf8'))
    return Promise.resolve(data)
  }
  // if (process.env.NODE_ENV === 'production' || route !== '/nl/') {
  // } else {
  //   const query =
  //   return fetch(
  //     'https://graphql.datocms.com/',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'Authorization': `Bearer ${process.env.DATO_API_TOKEN}`,
  //       },
  //       body: JSON.stringify({ query, variables })
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res)
  //       return res.data
  //     })
  // }
}
