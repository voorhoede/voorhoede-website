/* Important 
At v2.4.0 @nuxtjs/sitemap module can't generate i18n supported dynamic routes.
Thats why sitemaps are generated based on locales.
*/
const locales = require('../../../src/client/static/data/app.json').locales
const routes = require('../lib/routes')

function getPriority (route) {
    let value = 0.5
    const priorties = {
        services: 0.9,
        cases: 0.8,
        blog: 0.7,
        events: 0.6
    }
    for(let key in priorties) {
        if (route.includes(key.toString())) {
            value = priorties[key]
        }
    }
    return value
}

module.exports = [
    '@nuxtjs/sitemap',
    {
        hostname: process.env.URL,
        exclude: [
            '*/*',
        ],
        sitemaps: locales.map(locale => {
          const regex = new RegExp('^'+ locale.code + '/')
          return {
            path: `/sitemap-${locale.code}.xml`,
            lang: locale.code,
            exclude: ['/**'],
            routes: routes
                .filter(route => route.match(regex, 'g'))
                .map(route => {
                    return {
                        url: route,
                        priority: getPriority(route),
                        gzip: true
                    }
                })
            }
        })
    }
]