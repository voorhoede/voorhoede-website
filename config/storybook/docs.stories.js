import startCase from 'lodash/startCase'
import { storiesOf } from '@storybook/vue'

const stories = storiesOf('Documentation', module)
const docs = require.context('../../_docs', true, /.md$/)
const gfmCSS =
  'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.css'
const wrapperStyling =
  'box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 0 45px;'

docs.keys().forEach(filename => {
  const [, , docTitle] = filename.match(/(\.\/)([\w-]+)/)

  stories.add(startCase(docTitle), () => ({
    template: `
      <div class="markdown-body" style="${wrapperStyling}">
        <link rel="stylesheet" href="${gfmCSS}"/>
        ${docs(filename)}
      </div>`,
  }))
})
