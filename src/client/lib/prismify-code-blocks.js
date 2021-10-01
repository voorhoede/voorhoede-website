const Prism = require('prismjs')
/*
 * Build performance gets poor when requiring additional languages in development for client side code,
 * since webpack doesn't know which language will be passed through here.
 * Therefore webpack will look for everything that could match
 * the path in the require statement.
 * The required languages here will also be highlighted in development.
 */
require('prismjs/components/prism-bash')
require('prismjs/components/prism-graphql')
require('prismjs/components/prism-wasm')

module.exports = function prismifyCodeBlocks(items) {
  items.forEach(item => {
    const { body, language, __typename } = item
    if (__typename === 'CodeBlockRecord' && body && language) {
      let prismified
      /*
       * In production builds, any language will have syntax highlighting,
       * since the code will be replaced with prismified code, before being dumped.
       */
      if (process.env.NODE_ENV === 'production' && !Prism.languages.hasOwnProperty(language)) {
        require(`prismjs/components/prism-${language}`)
      }
      try {
        prismified = Prism.highlight(body, Prism.languages[language])
      } catch (e) {
        console.error(`Unable to prismify code block for language ${language}: ${e.message}`) // eslint-disable-line no-console
        return
      }
      item.body = prismified
    }
  })
}
