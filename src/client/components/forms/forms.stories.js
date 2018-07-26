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
        <label>
          <span class="body-petite">Text field</span>
          <input class="body" type="text" placeholder="Placeholder goes here"/>
        </label>
        <label>
          <span class="body-petite">Invalid text field</span>
          <input class="body" type="text" pattern="Should be valid" value="Not valid"/>
        </label>

        <label>
          <span class="body-petite">Select an item</span>
          <select class="body">
            <option selected disabled>Select an option</option>
            <option>Option A</option>
            <option>Option B</option>
            <option>Option C</option>
          </select>
        </label>

        <label>
          <span class="body-petite">Textarea</span>
          <textarea rows="3" class="body" placeholder="Placeholder goes here"/>
        </label>

        <label>
          <span class="body-petite">Invalid textarea</span>
          <textarea rows="3" class="body" placeholder="Placeholder goes here" required></textarea>
        </label>
      </form>
    `,
  }),
)
