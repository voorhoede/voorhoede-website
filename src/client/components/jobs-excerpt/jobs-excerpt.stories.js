import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import JobsExcerpt from './jobs-excerpt.vue'
import README from './README.md'

const stories = storiesOf('Components/Jobs Excerpt', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('jobs-excerpt', JobsExcerpt)

stories.add(
  'Jobs Excerpt',
  () => ({
    data() {
      return {
        jobItems: [
          {
            'title': 'Front-end developer (medior/senior)',
            'jobImage': {
              'url': 'https://www.datocms-assets.com/6524/1536758259-vh-placeholder-small.svg',
              'alt': 'Small illustration that says "placeholder"'
            },
            'description': 'Passionate about the web and creating fast user interfaces? We are looking for a medior/senior front-end developer to join our team.',
            'jobLabel': 'View details',
            'url': 'https://de-voorhoede.homerun.co/front-end-tech-lead/en/apply',
          },
          {
            'title': 'Front-end developer (junior/medior)',
            'jobImage': {
              'url': 'https://www.datocms-assets.com/6524/1536758842-vh-placeholder.svg',
              'alt': 'Small illustration that says "placeholder"'
            },
            'description': 'Passionate about the web and creating fast user interfaces? We are looking for a junior/medior front-end developer to join our team.',
            'jobLabel': 'View details',
            'url': 'https://de-voorhoede.homerun.co/de-voorhoede-is-looking-for-front-end-developers/en/apply'
          },
          {
            'title': 'Graduation interns wanted',
            'jobImage': {
              'url': 'https://www.datocms-assets.com/6524/1536758259-vh-placeholder-small.svg',
              'alt': 'Small illustration that says "placeholder"'
            },
            'description': 'Want to do an internship or research in a team of 20 front-end specialists? We are looking for students who are passionate about front-end development.',
            'jobLabel': 'View details',
            'url': 'https://de-voorhoede.homerun.co/stage/en/apply'
          },
          {
            'title': 'Project manager / Scrum master',
            'jobImage': {
              'url': 'https://www.datocms-assets.com/6524/1536758259-vh-placeholder-small.svg',
              'alt': 'Small illustration that says "placeholder"'
            },
            'description': 'Een geboren organisator, een kei in het spotten van kansen en bekend met scrum? De Voorhoede zoekt een projectmanager / scrum master om ons team te versterken.',
            'jobLabel': 'View details',
            'url': 'https://de-voorhoede.homerun.co/projectmanager-scrum-master/nl/apply'
          }
        ],
      }
    },
    template: `
      <ul class="grid" style="background:#fffeca;">
        <li v-for="item in jobItems" :key="item.title" style="border-bottom: 2px solid var(--html-blue);grid-column:page;">
          <jobs-excerpt 
            :title="item.title" 
            :description="item.description" 
            :label="item.jobLabel" 
            :link="item.url" 
            :image="item.jobImage" 
          />
        </li>
      </ul>
    ` ,
  }),
)
