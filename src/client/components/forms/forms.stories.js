import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'
import './forms.css'

import Forms from './forms-demo.vue'
import README from './README.md'

const stories = storiesOf('Components/Forms', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('forms', Forms)

stories.add(
  'Forms',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <form>
        <label class="input">
          <span class="input__label">Text field</span>
          <input class="input__field" type="text" placeholder="Placeholder goes here"/>
        </label>
        <label class="input">
          <span class="input__label">Focused text field</span>
          <input class="input__field" type="text" placeholder="Placeholder goes here" autofocus/>
        </label>
        <label class="input">
          <span class="input__label">Invalid text field</span>
          <input class="input__field" type="text" pattern="abc" value="def"/>
        </label>
      </form>
    `
  }),
)
