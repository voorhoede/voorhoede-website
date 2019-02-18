const cheerio = require('cheerio')

module.exports = function addClassesToHeadings(items) {
  items.forEach(item => {
    const { body, __typename } = item
    if (__typename === 'TextSectionRecord' && body) {
      const $ = cheerio.load(item.body)
      for (let level of [1,2,3,4,5,6]) {
        $(`h${level}`).addClass(`h${level + 1}`)
      }
      item.body = $('body').html()
    }
  })
}
