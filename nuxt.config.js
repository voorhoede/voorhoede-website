const generate = require('./config/nuxt/generate')
const dotenv = require('dotenv-safe')

dotenv.config()

/**
 * Use Netlify's URL variable:
 * @see https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
 */
const { URL, DEFAULT_LOCALE, DATO_API_TOKEN } = process.env
const baseUrl = URL
const defaultLocale = DEFAULT_LOCALE

module.exports = {
  srcDir: 'src/client',

  generate,

  env: {
    baseUrl,
    defaultLocale,
    DATO_API_TOKEN
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'De Voorhoede',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Website for De Voorhoede' },
      { 'http-equiv': 'Accept-CH', content: 'DPR, Width, Viewport-Width, Save-Data' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://www.datocms-assets.com/' },
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#070de9' },

  router: {
    middleware: [
      'redirect-to-locale',
      'locale',
      'enforce-trailing-slash',
      'meta-canonical',
    ],
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: [
      require('postcss-custom-properties')(),
    ],

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // remove SVG from URL loader, so vue-svg-loader can be used for SVGs instead
      // based on https://github.com/nuxt/nuxt.js/issues/1332#issuecomment-321694185
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }


      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      })

      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      })
    }
  }
}
