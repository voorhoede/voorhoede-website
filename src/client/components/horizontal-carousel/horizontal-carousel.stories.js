import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import { ResponsiveImage } from '~/components'
import HorizontalCarousel from './horizontal-carousel.vue'
import README from './README.md'

const stories = storiesOf('Components/Horizontal Carousel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('responsive-image', ResponsiveImage)
Vue.component('horizontal-carousel', HorizontalCarousel)

stories.add(
  'Horizontal Carousel',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <horizontal-carousel :childrenCount="3">
        <template slot="slides">
          <div
            v-for="i in [0, 1, 2]"
            :key="i"
            class="horizontal-carousel__slide"
          >
            <responsive-image
              :image="{
                format: 'jpeg',
                width: 1280,
                height: 720,
                alt: 'Two hands forming a heart around the sun during a sunset',
                url: 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
              }"
            />
          </div>
        </template>
      </horizontal-carousel>
    `,
  }),
)
