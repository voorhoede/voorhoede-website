/**
 * Use Netlify's URL variable:
 * @see https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
 */
const { URL } = process.env
const baseUrl = URL

module.exports = {
  srcDir: 'src/client',

  generate: {
    dir: 'dist/client',
  },

  env: {
    baseUrl,
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
    },
  },
}
