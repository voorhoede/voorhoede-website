import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import createStore from '../../store'

import '../app-core/index.css'

import BlogAuthor from './blog-author.vue'
import README from './README.md'

const stories = storiesOf('Components/Blog Author', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('blog-author', BlogAuthor)

stories.add('Blog Author', () => ({
    store: createStore(),
    data() {
      return {
        author:
          {
            slug: 'some-slug',
            title: 'Peer-to-peer apis Peer-to-peer apis Peer-to-peer apis',
            date: '2018-04-20T00:00:00.000Z',
            authors: [{
              name: 'Marko',
              image: {
                format: 'jpeg',
                width: 135,
                height: 135,
                alt: 'Two hands forming a heart around the sun during a sunset',
                url: 'https://www.datocms-assets.com/2850/1522324546-marko.png?fit=crop&h=135&w=135',
              }
						},
						{
              name: 'Anand',
              image: {
                format: 'jpeg',
                width: 135,
                height: 135,
                alt: 'Two hands forming a heart around the sun during a sunset',
                url: 'https://www.datocms-assets.com/2850/1523362513-anandgraves_400x400.png?fit=crop&h=135&w=135',
              }
						},
						{
              name: 'Anne',
              image: {
                format: 'jpeg',
                width: 135,
                height: 135,
                alt: 'Two hands forming a heart around the sun during a sunset',
                url: 'https://www.datocms-assets.com/2651/1500886340-anne.jpg?fit=crop&h=135&w=135',
              }
            }],
            socialTitle: 'Give us a shoutout',
        },
      }
    },
    template: `
  <aside class="grid">
    <blog-author :item="author" />
  </aside>
` ,
  }),
)