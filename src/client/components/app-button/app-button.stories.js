import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { text, withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppButton from './app-button.vue'
import README from './README.md'

const defaultLabel = 'button'
const stories = storiesOf('Components/App Button', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-button', AppButton)

stories.add(
  'App Button',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    methods: {
      clickHandler: action('Button'),
    },
    template: `
      <div>
        <h1 class="h1">buttons</h1>

        <p class="body">
          These are the <strong>button</strong> styles that can be used thoughout the website.
        </p>

        <h2 class="h2">Primary</h2>
        <p class="body">
          This is the button that you want to use when it's a important call to action.
        </p>
        <table width="100%" style="margin-top: 1rem">
          <thead>
            <tr>
              <th class="table-header"></th>
              <th class="table-header">Default</th>
              <th class="table-header">Hover/Focus</th>
              <th class="table-header">Active</th>
              <th class="table-header">Disabled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 1rem; text-align: center;">Buttons</td>
              <td style="padding: 1rem; text-align: center;"><app-button label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button class="app-button--hover" label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button class="app-button--active" label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button label="${ text('label', defaultLabel) }" @click="clickHandler" disabled /></td>
            </tr>
            <tr>
              <td style="padding: 1rem; text-align: center;">Links</td>
              <td style="padding: 1rem; text-align: center;"><app-button label="${ text('label', defaultLabel) }" to="#" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button class="app-button--hover" label="${ text('label', defaultLabel) }" to="#" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button class="app-button--active" label="${ text('label', defaultLabel) }" to="#" /></td>
            </tr>
            <tr>
              <td style="padding: 1rem; text-align: center;">Modifier</td>
              <td style="padding: 1rem; text-align: center;"><app-button class="app-button--yellow" label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
            </tr>
          </tbody>
        </table>

        <h2 class="h2">Secondary</h2>
        <p class="body">
          This is the button that you want to use when it's a call to action.
        </p>
        <table width="100%" style="margin-top: 1rem">
          <thead>
            <tr>
              <th class="table-header"></th>
              <th class="table-header">Default</th>
              <th class="table-header">Hover/Focus</th>
              <th class="table-header">Active</th>
              <th class="table-header">Disabled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 1rem; text-align: center;">Buttons</td>
              <td style="padding: 1rem; text-align: center;"><app-button secondary label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button secondary class="app-button--hover" label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button secondary class="app-button--active" label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button secondary label="${ text('label', defaultLabel) }" @click="clickHandler" disabled /></td>
            </tr>
            <tr>
              <td style="padding: 1rem; text-align: center;">Links</td>
              <td style="padding: 1rem; text-align: center;"><app-button secondary label="${ text('label', defaultLabel) }" to="#" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button secondary class="app-button--hover" label="${ text('label', defaultLabel) }" to="#" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button secondary class="app-button--active" label="${ text('label', defaultLabel) }"  to="#" /></td>
            </tr>
          </tbody>
        </table>

        <h2 class="h2">Small</h2>
        <p class="body">
          This is a smaller variant of the primary button.
        </p>
        <table width="100%" style="margin-top: 1rem">
          <thead>
            <tr>
              <th class="table-header"></th>
              <th class="table-header">Default</th>
              <th class="table-header">Hover/Focus</th>
              <th class="table-header">Active</th>
              <th class="table-header">Disabled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 1rem; text-align: center;">Buttons</td>
              <td style="padding: 1rem; text-align: center;"><app-button small label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button small class="app-button--hover" label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button small class="app-button--active" label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button small label="${ text('label', defaultLabel) }" @click="clickHandler" disabled /></td>
            </tr>
            <tr>
              <td style="padding: 1rem; text-align: center;">Links</td>
              <td style="padding: 1rem; text-align: center;"><app-button small label="${ text('label', defaultLabel) }" to="#" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button small class="app-button--hover" label="${ text('label', defaultLabel) }" to="#" /></td>
              <td style="padding: 1rem; text-align: center;"><app-button small class="app-button--active" label="${ text('label', defaultLabel) }" to="#" /></td>
            </tr>
            <tr>
              <td style="padding: 1rem; text-align: center;">Modifier</td>
              <td style="padding: 1rem; text-align: center;"><app-button small class="app-button--yellow" label="${ text('label', defaultLabel) }" @click="clickHandler" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
)
