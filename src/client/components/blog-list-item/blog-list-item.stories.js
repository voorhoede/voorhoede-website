import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import BlogListItem from './blog-list-item.vue'
import README from './README.md'

const stories = storiesOf('Components/Blog List Item', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('blog-list-item', BlogListItem)

stories.add('Blog List item', () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data() {
      return {
        currentLocale: 'nl',
        blogItems: [
          {
            title: 'Peer-to-peer apis Peer-to-peer apis Peer-to-peer apis',
            date: '2018-04-20T00:00:00.000Z',
            authors: [{
              name: 'Marko',
              image: {
                format: 'jpeg',
                width: 40,
                height: 40,
                alt: 'Two hands forming a heart around the sun during a sunset',
                url: 'https://www.datocms-assets.com/2850/1522324546-marko.png?fit=crop&h=40&w=40',
              }
            }],
          },
          {
            title: '13 command line tools to up your Front-end Game\n',
            date: '2018-04-10T00:00:00.000Z',
            authors: [{
              name: 'Anand',
              image: {
                format: 'jpeg',
                width: 40,
                height: 40,
                alt: 'Two hands forming a heart around the sun during a sunset',
                url: 'https://www.datocms-assets.com/2850/1523362513-anandgraves_400x400.png?fit=crop&h=40&w=40',
              }
            }],
          },
          {
            title: 'Real-time communication with Server Sent Events\n',
            date: '2018-01-24T00:00:00.000Z',
            authors: [
              {
                name: 'Jesse',
                image: {
                  format: 'jpeg',
                  width: 40,
                  height: 40,
                  alt: 'Two hands forming a heart around the sun during a sunset',
                  url: 'https://www.datocms-assets.com/2651/1500886662-jesse.jpg?fit=crop&h=40&w=40',
                }
              },
              {
                name: 'Anne',
                image: {
                  format: 'jpeg',
                  width: 40,
                  height: 40,
                  alt: 'Two hands forming a heart around the sun during a sunset',
                  url: 'https://www.datocms-assets.com/2651/1500886340-anne.jpg?fit=crop&h=40&w=40',
                }
              }],
          },
        ],
      }
    },
    template: `
  <ol class="grid">
    <li v-for="item in blogItems" :key="item.title">
      <blog-list-item :item="item" :current-locale="this.currentLocale"/>
    </li>
  </ol>
` ,
  }),
)
