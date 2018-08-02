import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import pageHeaderDecoration from './page-header-decoration.vue'
import README from './README.md'

const stories = storiesOf('Components/Page Header Decoration', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('page-header-decoration', pageHeaderDecoration)

stories.add(
  'Page Header Decoration',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <div style="padding-bottom: 5rem; background: var(--bg-pastel);">
        <page-header-decoration style="height: 50vh;" curly-bracket background>
          <template slot="image">
            <img style="max-width: 100%; max-height: 100%" src="https://www.datocms-assets.com/6068/1529572359-random-image.jpeg" alt="image">
          </template>
        </page-header>
      </div>
    `,
  }),
)
