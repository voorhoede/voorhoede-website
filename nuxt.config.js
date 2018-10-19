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
      { 'charset': 'utf-8' },
      { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' },
      { 'name': 'classification', 'content': 'business' },
      { 'name': 'theme-color', 'content': '#ffe400' },
      { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
      { 'http-equiv': 'cleartype', 'content': 'on' },
      { 'http-equiv': 'Accept-CH', 'content': 'DPR, Width, Viewport-Width, Save-Data' },
      { 'name': 'robots', 'content': 'index,follow,noodp' },
      { 'name': 'googlebot', 'content': 'index,follow' },
      /* Facebook */
      { 'property': 'og:url', 'content': `${baseUrl}/` },
      { 'property': 'og:type', 'content': 'website' },
      { 'property': 'og:title', 'content': 'De Voorhoede' },
      { 'property': 'og:image', 'content': `${baseUrl}/images/social/logo-wide.jpg` },
      { 'property': 'og:image:width', 'content': '1000' },
      { 'property': 'og:image:height', 'content': '500' },
      { 'property': 'og:site_name', 'content': 'www.voorhoede.nl' },
      /* Twitter */
      { 'name': 'twitter:card', 'content': 'summary_large_image' },
      { 'name': 'twitter:creator', 'content': '@devoorhoede' },
      { 'name': 'twitter:url', 'content': `${baseUrl}/` },
      { 'name': 'twitter:title', 'content': 'De Voorhoede' },
      { 'name': 'twitter:image', 'content': `${baseUrl}/images/social/logo-wide.jpg` },
      /* Windows */
      { 'name': 'msapplication-square70x70logo', 'content': '/images/social/windows-icon-70x70.png' },
      { 'name': 'msapplication-square150x150logo', 'content': '/images/social/windows-icon-150x150.png' },
      { 'name': 'msapplication-square310x150logo', 'content': '/images/social/windows-icon-310x150.png' },
      { 'name': 'msapplication-square310x310logo', 'content': '/images/social/windows-icon-310x310.png' },
      { 'name': 'msapplication-TileColor', 'content': '#dedede' },
      /* Apple */
      { 'name': 'apple-mobile-web-app-title', 'content': 'De Voorhoede' },
      { 'name': 'apple-mobile-web-app-capable', 'content': 'yes' },
      { 'name': 'apple-mobile-web-app-status-bar-style', 'content': 'white' },
    ],
    link: [
      /* Favicon */
      { 'rel': 'shortcut icon', 'type': 'image/x-icon', 'href': '/images/social/favicon.ico' },
      { 'rel': 'icon', 'type': 'image/png', 'href': '/images/social/favicon-16x16.png' },
      { 'rel': 'icon', 'type': 'image/png', 'href': '/images/social/favicon-32x32.png' },
      /* Android / Chrome */
      { 'rel': 'icon', 'type': 'image/png', 'href': '/images/social/android-36x36.png', 'sizes': '36x36' },
      { 'rel': 'icon', 'type': 'image/png', 'href': '/images/social/android-48x48.png', 'sizes': '48x48' },
      { 'rel': 'icon', 'type': 'image/png', 'href': '/images/social/android-72x72.png', 'sizes': '72x72' },
      { 'rel': 'icon', 'type': 'image/png', 'href': '/images/social/android-96x96.png', 'sizes': '96x96' },
      { 'rel': 'icon', 'type': 'image/png', 'href': '/images/social/android-144x144.png', 'sizes': '144x144' },
      { 'rel': 'icon', 'type': 'image/png', 'href': '/images/social/android-192x192.png', 'sizes': '192x192' },
      { 'rel': 'manifest', 'type': 'application/manifest+json', 'href': '/manifest.json' },
      /* Safari */
      { 'rel': 'apple-touch-icon', 'href': '/images/social/apple-icon-60x60.png', 'sizes': '60x60' },
      { 'rel': 'apple-touch-icon', 'href': '/images/social/apple-icon-76x76.png', 'sizes': '76x76' },
      { 'rel': 'apple-touch-icon', 'href': '/images/social/apple-icon-120x120.png', 'sizes': '120x120' },
      { 'rel': 'apple-touch-icon', 'href': '/images/social/apple-icon-152x152.png', 'sizes': '152x152' },
      { 'rel': 'apple-touch-icon', 'href': '/images/social/apple-icon-180x180.png', 'sizes': '180x180' },
      { 'rel': 'mask-icon', 'href': '/images/social/logo-monochrome.svg', color: '#5959ff' },
      /* Prefetch */
      { 'rel': 'dns-prefetch', 'href': 'https://www.datocms-assets.com/' },
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

  css: [
    'prismjs/themes/prism.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'url-search-params-polyfill'
    ],

    postcss: [
      require('postcss-custom-properties')()
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
