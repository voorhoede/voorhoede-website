import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import readme from './README.md'
import FullWidthImage from './'

storiesOf('Components/Full width image', module)
  .addDecorator(withReadme(readme))
  .add('Ratio 16x9', () => ({
    components: { FullWidthImage },
    template: '<full-width-image :image="image" />',
    data() {
      return {
        image: {
          'format': 'jpeg',
          'width': 1280,
          'height': 720,
          'alt': 'Two hands forming a heart around the sun during a sunset',
          'url': 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
        },
      }
    },
  }))
