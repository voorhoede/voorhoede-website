import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'

import '../app-core/index.css'

import ResponsiveVideo from './responsive-video.vue'
import README from './README.md'

const stories = storiesOf('Components/Responsive video', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('responsive-video', ResponsiveVideo)

stories.add(
  'Vimeo Default',
  () => ({
    template: '<responsive-video :video="item.video" :autoplay="item.autoplay" :loop="item.loop" :mute="item.autoplay" />',
    data() {
      return {
        item: {
          'autoplay': false,
          'mute': false,
          'loop': false,
          'video': {
            'url': 'https://vimeo.com/265601385',
            'title': 'A New Campaign - PickUp10',
            'width': 640,
            'height': 360,
            'provider': 'vimeo',
            'providerUid': '265601385',
            'thumbnailUrl': 'https://i.vimeocdn.com/video/695812178_640.jpg',
          }
        }
      }
    }
  }),
)
.add('Vimeo with autoplay', () => ({
  template: '<responsive-video :video="item.video" :autoplay="item.autoplay" :loop="item.loop" :mute="item.autoplay" />',
  data() {
    return {
      item: {
        'autoplay': true,
        'mute': true,
        'loop': false,
        'video': {
          'url': 'https://vimeo.com/265601385',
          'title': 'A New Campaign - PickUp10',
          'width': 640,
          'height': 360,
          'provider': 'vimeo',
          'providerUid': '265601385',
          'thumbnailUrl': 'https://i.vimeocdn.com/video/695812178_640.jpg',
        }
      }
    }
  },
}))
.add('Vimeo with loop and autoplay', () => ({
  template: '<responsive-video :video="item.video" :autoplay="item.autoplay" :loop="item.loop" :mute="item.autoplay" />',
  data() {
    return {
      item: {
        'autoplay': true,
        'mute': true,
        'loop': true,
        'video': {
          'url': 'https://vimeo.com/55491848',
          'title': '10 second holiday video',
          'width': 640,
          'height': 360,
          'provider': 'vimeo',
          'providerUid': '55491848',
          'thumbnailUrl': 'https://i.vimeocdn.com/video/384455198_640.jpg',
        }
      }
    }
  },
}))
.add('YouTube default', () => ({
  template: '<responsive-video :video="item.video" :autoplay="item.autoplay" :loop="item.loop" :mute="item.autoplay" />',
  data() {
    return {
      item: {
        'autoplay': false,
        'mute': false,
        'loop': false,
        'video': {
          'url': 'https://www.youtube.com/watch?v=ZPIIT6siIaE&list=PL8HcoiB7g3NlaU-UU1boptT4tkz3KOXT2',
          'title': 'Een surfer neemt het op tegen de plastic vervuiling',
          'width': 480,
          'height': 270,
          'provider': 'youtube',
          'providerUid': 'ZPIIT6siIaE',
          'thumbnailUrl': 'https://i.ytimg.com/vi/ZPIIT6siIaE/hqdefault.jpg',
        }
      }
    }
  },
}))
.add('YouTube with autoplay', () => ({
  template: '<responsive-video :video="item.video" :autoplay="item.autoplay" :loop="item.loop" :mute="item.autoplay" />',
  data() {
    return {
      item: {
        'autoplay': true,
        'mute': true,
        'loop': false,
        'video': {
          'url': 'https://www.youtube.com/watch?v=ZPIIT6siIaE&list=PL8HcoiB7g3NlaU-UU1boptT4tkz3KOXT2',
          'title': 'Een surfer neemt het op tegen de plastic vervuiling',
          'width': 480,
          'height': 270,
          'provider': 'youtube',
          'providerUid': 'ZPIIT6siIaE',
          'thumbnailUrl': 'https://i.ytimg.com/vi/ZPIIT6siIaE/hqdefault.jpg',
        }
      }
    }
  },
}))
.add('Youtube with loop and autoplay', () => ({
  template: '<responsive-video :video="item.video" :autoplay="item.autoplay" :loop="item.loop" :mute="item.autoplay" />',
  data() {
    return {
      item: {
        'autoplay': true,
        'mute': true,
        'loop': true,
        'video': {
          'url': 'https://www.youtube.com/watch?v=B7bqAsxee4I',
          'title': 'Short funny video',
          'width': 480,
          'height': 270,
          'provider': 'youtube',
          'providerUid': 'B7bqAsxee4I',
          'thumbnailUrl': 'https://i.ytimg.com/vi/B7bqAsxee4I/hqdefault.jpg',
        }
      }
    }
  },
}))
