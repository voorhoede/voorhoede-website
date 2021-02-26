const { writeFileSync } = require('fs')
const path = require('path')
const builder = require('xmlbuilder')
const { items, page: { social: { description } } } = require('../../src/client/static/data/pages/en/blog/')
const url = process.env.URL || 'https://voorhoede.nl'

const feedObject = {
  rss: {
    '@version': '2.0',
    '@xmlns:atom': 'http://www.w3.org/2005/Atom',
    channel: {
      'atom:link': {
        '@href': `${url}/blog-feed.xml`,
        '@ref': 'self',
        '@type': 'application/rss+xml'
      },
      title: 'Voorhoede Blog',
      description,
      lastBuildDate: new Date().toUTCString(),
      link: `${url}/en/blog`,
      language: 'en',
      item: items
        .filter(({ published }) => published)
        .map(({ date, title, slug, social: { description } }) => {
          const link = `${url}/en/blog/${slug}`
          return {
            pubDate: new Date(date).toUTCString(),
            title,
            description,
            link,
            guid: {
              '@isPermaLink': true,
              '#text': link
            },
          }
        })
    }
  }
}

const feed = builder.create(feedObject, { encoding: 'utf-8' })
const filepath = path.join(__dirname, '../../dist/client/blog-feed.xml')
writeFileSync(filepath, feed.end({ pretty: true }) )
console.log(`Feed written to ${filepath}`) // eslint-disable-line
