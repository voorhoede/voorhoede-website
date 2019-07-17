import addClassesToHeadings from '../add-classes-to-headings'
import prismifyCodeBlocks from '../prismify-code-blocks'

export default function ({ route, app }) {
  const dayjs = require('dayjs')
  const fetch = require('node-fetch')

  let queryPath

  const slug = route.params.slug
  const routeName = route.name.match(`.*(?=${app.i18n.routesNameSeparator})`)[0]
  const variables = {
    locale: app.i18n.locale,
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
    query = require(`~/pages/${queryPath}.query.graphql`)
  } else {
    query = require('fs').readFileSync(`src/client/pages/${queryPath}.query.graphql`, 'utf8')
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
      body: JSON.stringify({ query, variables }),
    }
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error fetching data. ${res.statusText}`)
      }
      if (res.errors) {
        throw new Error(JSON.stringify(res.errors))
      }
      return res.json()
    })
    .then((res) => res.data)
    .then(data => {
      if (data.page && Array.isArray(data.page.items)) {
        addClassesToHeadings(data.page.items)
        prismifyCodeBlocks(data.page.items)
      }
      return data
    })
}
