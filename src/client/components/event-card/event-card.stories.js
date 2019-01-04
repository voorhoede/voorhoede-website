import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import EventCard from './event-card.vue'
import README from './README.md'
import createStore from '../../store'

const stories = storiesOf('Components/Event Card', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('event-card', EventCard)

stories.add(
  'Event Card (Academy)',
  () => ({
    store: createStore(),
    template: `
      <div style="padding: 20px">
        <event-card
          date-string="2019-01-25T09:00:00+01:00"
          title="Progressive Web App Masterclass"
          description="A Progressive Web App promises a native-app-like experience in the browser leading to higher retention and conversion. In this masterclass you will create a full fledged PWA from a real world example site. The app will be installable, run fullscreen, continue to work offline and support push notifications!"
          :illustration="{
            'url':'https://www.datocms-assets.com/6524/1544179802-jobs.svg',
            'format':'svg',
            'width':null,
            'height':null}"
          label="academy"/>
      </div>`
  })
)

stories.add(
  'Event Card (Meet-up)',
  () => ({
    store: createStore(),
    template: `
      <div style="padding: 20px">
        <event-card
          date-string="2019-02-15T00:00:00+01:00"
          title="Test meetup about decentralization"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ergo illi intellegunt quid Epicurus dicat, ego non intellego? Eodem modo is enim tibi nemo dabit, quod, expetendum sit, id esse laudabile. Teneo, inquit, finem illi videri nihil dolere."
          :illustration="{
            'format':'svg',
            'height':null,
            'url':'https://www.datocms-assets.com/6524/1544177618-robotseniorblue.svg',
            'width':null}"
          label="Meet-up" />
      </div>`
  })
)
