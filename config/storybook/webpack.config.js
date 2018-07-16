const path = require('path')

const nuxtRootDir = path.resolve(`${__dirname}/../../src/client`)

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.resolve.alias = {
    vue$: 'vue/dist/vue.esm.js',
    '~': nuxtRootDir,
    '~~': nuxtRootDir,
  }

  return defaultConfig
}
