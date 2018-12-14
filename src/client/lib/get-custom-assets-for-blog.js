const path = require('path')

export default function getCustomAssetsForBlog({ slug }) {
  const filePath = path.join('/blog-custom-assets', slug,)
  const customScriptPath = path.join(filePath, 'index.js')
  const customStylesPath = path.join(filePath, 'index.css')

  return { customScriptPath, customStylesPath }
}
