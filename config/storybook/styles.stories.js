import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
// import README from './_styles/README.md'
import stylesTypography, {
  FallbackTypography,
} from './_styles/styles-typography'

const stories = storiesOf('Styles', module)
const gfmCSS =
  'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.css'
const wrapperStyling =
  'box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 0 45px;'

Vue.component('styles-typography', stylesTypography)
Vue.component('fallback-typography', FallbackTypography)

stories.add('Typography', () => ({
  template: `<div class="markdown-body" style="${wrapperStyling}">
              <link rel="stylesheet" href="${gfmCSS}"/>
              <styles-typography />
              <fallback-typography />
            </div>`,
}))
