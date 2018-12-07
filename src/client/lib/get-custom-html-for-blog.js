const path = require('path')

export function getCustomHtmlForBlog({ slug }) {
  const filepath = path.join('/blog-custom-html', slug, 'index.html')
  if (process.client) {
    // On client load over http
    return fetch(filepath)
      .then(res => res.text())
      .catch(() => null)
  } else {
    // On server load from file system
    try {
      const data = require('fs').readFileSync(`src/client/static${filepath}`, 'utf-8')
      return Promise.resolve(data)
    } catch (error) {
      return null
    }
  }
}
