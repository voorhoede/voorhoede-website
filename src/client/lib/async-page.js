import path from 'path'

import { SET_I18N_SLUGS } from '~/store/mutation-types'

const fetchPage = process.env.NODE_ENV === 'production'
  ? function ({ route }) {
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
  // Fetch page data directly from graphql api in development
  : function ({ route, i18n }) {
    // Require modules here, so they don't get included in production build
    const dayjs = require('dayjs')

    const { doQuery } = require('./query-api')
    const addClassesToHeadings = require('./add-classes-to-headings')
    const prismifyCodeBlocks = require('./prismify-code-blocks')

    let queryPath

    const slug = route.params.slug
    const routeName = route.name.match(`.*(?=${i18n.routesNameSeparator})`)[0]
    const variables = {
      locale: i18n.locale,
      currentDate: dayjs().format('YYYY-MM-DD')
    }

    if (slug) {
      const slugRouteName = routeName.split('-slug')[0]
      queryPath = `${slugRouteName}/_slug`
      variables.slug = slug
    } else if (routeName === 'index') {
      queryPath = `${routeName}`
    } else {
      queryPath  = `${routeName}/index`
    }

    let query
    if (process.client) {
      query = require(`../pages/${queryPath}.query.graphql`)
    } else {
      query = require('fs').readFileSync(`src/client/pages/${queryPath}.query.graphql`, 'utf8')
    }

    return doQuery({ query, variables })
      .then(data => {
        if (data.page && Array.isArray(data.page.items)) {
          addClassesToHeadings(data.page.items)
          prismifyCodeBlocks(data.page.items)
        }
        return data
      })
  }

export default async function asyncPage ({ route, store, error, app } ) {
  try {
    const data = await fetchPage({ route, i18n: app.i18n })
    store.commit(SET_I18N_SLUGS, data.page.i18nSlugs)
    return data
  } catch (e) {
    return error({
      statusCode: 404,
    })
  }
}
