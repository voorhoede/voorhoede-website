const dotenv = require('dotenv-safe')
const generate = require('./config/nuxt/generate')
const modules = require('./config/nuxt/modules')

dotenv.config()

/**
 * Use Netlify's URL variable:
 * @see https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
 */
const { URL, DATO_API_TOKEN } = process.env
const baseUrl = URL

module.exports = {
  target: 'static',
  srcDir: 'src/client',
  components: true,
  telemetry: true,
  generate,
  modules,
  env: {
    baseUrl,
    DATO_API_TOKEN
  },

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      'class': 'yellow-background',
    },
    bodyAttrs: {
      'class': 'white-background',
    },
    meta: [
      { 'charset': 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'classification', content: 'business' },
      { name: 'theme-color', content: '#ffe400' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Accept-CH', content: 'DPR, Width, Viewport-Width, Save-Data' },
      { name: 'robots', content: 'index,follow,noodp' },
      { name: 'googlebot', content: 'index,follow' },
      /* Windows */
      { name: 'msapplication-square70x70logo', content: '/images/social/windows-icon-70x70.png' },
      { name: 'msapplication-square150x150logo', content: '/images/social/windows-icon-150x150.png' },
      { name: 'msapplication-square310x150logo', content: '/images/social/windows-icon-310x150.png' },
      { name: 'msapplication-square310x310logo', content: '/images/social/windows-icon-310x310.png' },
      { name: 'msapplication-TileColor', content: '#dedede' },
      /* Apple */
      { name: 'apple-mobile-web-app-title', content: 'De Voorhoede' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
      { name: 'google-site-verification', content: 'wHLlpqy0uqVHxgo_Qlx40XID0ts7owLv1P7IWwtyzU8' },
    ],
    link: [
      /* Favicon */
      { rel: 'alternate', hreflang: 'en', type: 'application/rss+xml', href: `${baseUrl}/blog-feed.xml` },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/images/social/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/images/social/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', href: '/images/social/favicon-32x32.png' },
      /* Android / Chrome */
      { rel: 'icon', type: 'image/png', href: '/images/social/android-36x36.png', sizes: '36x36' },
      { rel: 'icon', type: 'image/png', href: '/images/social/android-48x48.png', sizes: '48x48' },
      { rel: 'icon', type: 'image/png', href: '/images/social/android-72x72.png', sizes: '72x72' },
      { rel: 'icon', type: 'image/png', href: '/images/social/android-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/png', href: '/images/social/android-144x144.png', sizes: '144x144' },
      { rel: 'icon', type: 'image/png', href: '/images/social/android-192x192.png', sizes: '192x192' },
      { rel: 'manifest', type: 'application/manifest+json', href: '/manifest.json' },
      /* Safari */
      { rel: 'apple-touch-icon', href: '/images/social/apple-icon-60x60.png', sizes: '60x60' },
      { rel: 'apple-touch-icon', href: '/images/social/apple-icon-76x76.png', sizes: '76x76' },
      { rel: 'apple-touch-icon', href: '/images/social/apple-icon-120x120.png', sizes: '120x120' },
      { rel: 'apple-touch-icon', href: '/images/social/apple-icon-152x152.png', sizes: '152x152' },
      { rel: 'apple-touch-icon', href: '/images/social/apple-icon-180x180.png', sizes: '180x180' },
      { rel: 'mask-icon', href: '/images/social/logo-monochrome.svg', color: '#5959ff' },
      /* Prefetch */
      { rel: 'dns-prefetch', href: 'https://www.datocms-assets.com/' },
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#070de9' },

  plugins: [
    { src: '~/plugins/axe.js', mode: 'client' },
    { src: '~/plugins/fetch-polyfill', mode: 'client' },
    { src: '~/plugins/locale-urls' },
    { src: '~/plugins/ascii-art', mode: 'client' },
    { src: '~/plugins/promise-polyfill', mode: 'client' },
    { src: '~/plugins/svg-sprite-polyfill', mode: 'client' },
    { src: '~/plugins/jsonld', mode: 'client' },
    { src: '~/plugins/vue-announcer', mode: 'client' },
    { src: '~/directives/scroll-highlight', mode: 'client' },
  ],

  css: [
    '~/components/app-core/index.css'
  ],

  /*
  ** Build configuration
  */
  build: {
    // Fix for console spamming of Babel warning, see:
    // https://stackoverflow.com/questions/67350359/nuxt-js-fresh-install-of-nuxt-2-14-6-contains-babel-loose-option-warnings
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-custom-properties': {
          importFrom: './src/client/components/app-core/variables.css'
        },
        'autoprefixer': {
          overrideBrowserslist: ['ie 11', 'last 2 versions'],
          grid: true,
        }
      }
    },

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      })
    }
  }
}
