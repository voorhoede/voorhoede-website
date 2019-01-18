const path = require('path')
const fetch = require('node-fetch')

const addClassesToHeadings = require('./add-classes-to-headings')
const prismifyCodeBlocks = require('./prismify-code-blocks')

const locales = ['nl', 'en']
const layoutRegex = new RegExp(`(${locales.join('|')})/layouts/[a-z-]`)

export function getData(route, variables) {
  if (process.env.NODE_ENV !== 'production') {
    let queryPath

    if (route.path.match(layoutRegex)) {
      const layout = (route.path.indexOf('error') >= 0) ? 'error' : 'default'
      queryPath = `layouts/${layout}.query.graphql`
    }
    else {
      const slug = route.params.slug
      if (slug) {
        const routeRegex = new RegExp(/(?<=locale-)[a-z-]{1,}(?=-)/)
        const routeName = route.name.match(routeRegex)[0]
        queryPath = `pages/_locale/${routeName}/_slug.query.graphql`
        variables.slug = slug
      } else {
        const routeRegex = new RegExp(/(?<=locale-)[a-z-]*/)
        const routeQueryPath = route.name.match(routeRegex) ? route.name.match(routeRegex)[0] + '/' : ''
        queryPath = `pages/_locale/${routeQueryPath}index.query.graphql`
      }
    }

    let query
    if (process.client) {
      query = require(`../${queryPath}`)
    } else {
      query = require('fs').readFileSync(`src/client/${queryPath}`, 'utf8')
    }

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
      .then(res => {
        const data = res.data
        if (data.page && Array.isArray(data.page.items)) {
          addClassesToHeadings(data.page.items)
          prismifyCodeBlocks(data.page.items)
        }
        return data
      })
  } else {
    const filepath = path.join('/data', route.path, 'index.json')
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
