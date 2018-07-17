const path = require('path')

const nuxtRootDir = path.resolve(`${__dirname}/../../src/client`)

module.exports = (baseConfig, env, defaultConfig) => {
  const urlLoader = defaultConfig.module.rules.find((rule) => /file-loader/.test(rule.loader))
  urlLoader.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/

  defaultConfig.resolve.alias = {
    vue$: 'vue/dist/vue.esm.js',
    '~': nuxtRootDir,
    '~~': nuxtRootDir,
  }

  defaultConfig.module.rules.push({
    test: /\.svg$/,
    loader: 'vue-svg-loader'
  })

  return defaultConfig
}
