const pick = require('./lib/pick')

module.exports = function blogPosts(postData) {
  return pick(['title'], postData)
}
