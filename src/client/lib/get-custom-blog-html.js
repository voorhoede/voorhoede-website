const path = require('path')

export function getCustomBlogHtml({ slug }) {
  const filepath = path.join('/blog', slug, 'index.html')
  if (process.client) {
    // On client load over http
    return fetch(filepath).catch(() => null)
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
