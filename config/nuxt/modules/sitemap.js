/* Important 
At v2.4.0 @nuxtjs/sitemap module can't generate i18n supported dynamic routes.
Thats why sitemaps are generated based on locales.
*/
const locales = require('../../../src/client/static/data/app.json').locales
const routes = require('../lib/routes');

module.exports = [
    '@nuxtjs/sitemap',
    {
        hostname: process.env.URL,
        i18n: {
            locales: locales.map(locale => locale.code)
        },
        sitemaps: locales.map(locale => {
          const regex = new RegExp(locale.code + '/')
          return {
            path: `/sitemap-${locale.code}.xml`,
            lang: locale.code,
            routes: routes.filter(route => route.match(regex, "g"))
          }
        })
    }
]