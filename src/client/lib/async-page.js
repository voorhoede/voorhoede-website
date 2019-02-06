import dayjs from 'dayjs'
import path from 'path'

import { SET_I18N_SLUGS } from '~/store/mutation-types'
import addClassesToHeadings  from './add-classes-to-headings'
import prismifyCodeBlocks  from './prismify-code-blocks'

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

export function fetchPage({ route, i18n }) {
  if (process.env.NODE_ENV !== 'production') {
    let queryPath

    const slug = route.params.slug
    const routeName = route.name.match(`.*(?=${i18n.routesNameSeparator})`)[0]
    const variables = {
      locale: i18n.locale,
      currentDate: dayjs().format('YYYY-MM-DD')
    }

    if (slug) {
      const slugRouteName = routeName.split('-slug')[0]
      queryPath = `pages/${slugRouteName}/_slug.query.graphql`
      variables.slug = slug
    } else if (routeName === 'index') {
      queryPath = `pages/${routeName}.query.graphql`
    } else {
      queryPath  = `pages/${routeName}/index.query.graphql`
    }

    let query
    if (process.client) {
      query = require(`../${queryPath}`)
    } else {
      query = require('fs').readFileSync(`src/client/${queryPath}`, 'utf8')
    }

    const fetch = require('node-fetch')

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

        if ('page' in data && !data.page) {
          throw new Error({ statusCode: 404 })
        }

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
