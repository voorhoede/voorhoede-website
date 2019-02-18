const builder = require('xmlbuilder')
const url = process.env.URL || 'https://voorhoede.nl/'
const { items, page: { social: { description } } } = require('../../src/client/static/data/en/blog/')
const feedObject = {
  rss: {
    '@version': '2.0',
    channel: {
      title: 'Voorhoede Blog',
      description,
      lastBuildDate: new Date().toUTCString(),
      link: `${url}en/blog`,
      language: 'en',
      item: items
        .filter(({ published }) => published)
        .map(({ date, title, slug, social: { description } }) => {
          return {
            pubDate: new Date(date).toUTCString(),
            title,
            description,
            guid: {
              '@isPermaLink': true,
              '#text': `${url}en/blog/${slug}`
            },
          }
        })
    }
  }
}

const feed = builder.create(feedObject, { encoding: 'utf-8' })
console.log(feed.end({ pretty: true }))
