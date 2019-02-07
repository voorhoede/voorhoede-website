const Prism = require('prismjs')

module.exports = function prismifyCodeBlocks(items) {
  items.forEach(item => {
    const { body, language, __typename } = item
    if (__typename === 'CodeBlockRecord' && body && language) {
      let prismified
      if (!Prism.languages.hasOwnProperty(language)) {
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
