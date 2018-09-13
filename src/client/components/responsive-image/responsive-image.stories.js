import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import readme from './README.md'
import ResponsiveImage from './'

storiesOf('Components/Responsive image', module)
  .addDecorator(withReadme(readme))
  .add('Ratio 16x9', () => ({
    components: { ResponsiveImage },
    template: '<responsive-image :image="image" />',
    data() {
      return {
        image: {
          'format': 'jpeg',
          'width': 1280,
          'height': 720,
          'alt': 'Declan playing on the selfmade game machines',
          'url': 'https://www.datocms-assets.com/2850/1506590055-untitled-1.jpg',
        },
      }
    },
  }))
  .add('Without fixed ratio', () => ({
    components: { ResponsiveImage },
    template: '<responsive-image :enable-fixed-ratio="false" :image="image" />',
    data() {
      return {
        image: {
          'format': 'jpeg',
          'alt': 'Declan playing on the selfmade game machines',
          'url': 'https://www.datocms-assets.com/2850/1506590055-untitled-1.jpg',
        },
      }
    },
  }))
  .add('Ratio 1x1', () => ({
    components: { ResponsiveImage },
    template: '<responsive-image :image="image" />',
    data() {
      return {
        image: {
          'format': 'jpeg',
          'width': 360,
          'height': 360,
          'alt': 'Mountain landscape with a cloudy sky',
          'url': 'https://www.datocms-assets.com/6068/1529671983-random-image-square.jpeg',
        },
      }
    },
  }))
  .add('Ratio 1x1 - with caption', () => ({
    components: { ResponsiveImage },
    template: `
      <figure class="responsive-image">
        <responsive-image :image="image" />
        <figcaption class="responsive-image__caption body-detail" v-if="image.title">
          {{ image.title }}
        </figcaption>
      </figure>
    `,
    data() {
      return {
        image: {
          'format': 'jpeg',
          'width': 360,
          'height': 360,
          'title': 'The view during our lunch break',
          'alt': 'Mountain landscape with a cloudy sky',
          'url': 'https://www.datocms-assets.com/6068/1529671983-random-image-square.jpeg',
        },
      }
    },
  }))
  .add('Broken image', () => ({
    components: { ResponsiveImage },
    template: '<responsive-image :image="image" />',
    data() {
      return {
        image: {
          'format': 'jpeg',
          'width': 360,
          'height': 360,
          'title': 'The view during our lunch break',
          'alt': 'Mountain landscape with a cloudy sky',
          'url': 'broken url',
        },
      }
    },
  }))
