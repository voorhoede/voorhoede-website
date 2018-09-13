<template>
  <figure class="full-width-image">
    <responsive-image :enable-fixed-ratio="false" :image="image" />
    <figcaption class="full-width-image__caption" v-if="image.title">
      {{ image.title }}
    </figcaption>
  </figure>
</template>

<script>
  import ResponsiveImage from '../responsive-image'
  import LazyLoad from '../lazy-load'
  import NoScript from '../no-script'
  import imageUrl from '../../lib/image-url'

  export default {
    components: {
      LazyLoad,
      NoScript,
      ResponsiveImage,
    },
    props: {
      image: {
        type: Object,
        required: true,
        validator(image) {
          return typeof(image.width) === 'number' && typeof(image.height) === 'number'
            && typeof(image.format) === 'string' && typeof(image.url) === 'string'
        },
      },
    },
    data() {
      return {
        width: null,
      }
    },
    mounted() {
      const pixelRatio = window.devicePixelRatio || 1
      const cssWidth = this.$el.getBoundingClientRect().width
      const width = cssWidth * pixelRatio
      this.width = width
    },
    methods: {
      imageUrl(options) {
        if (this.width < 720) {
          Object.assign(options, { fit:'crop', 'h': 288, crop: 'faces' })
        } else {
          Object.assign(options, { fit:'crop', 'h': 512, 'w': 1440, crop: 'faces' })
        }

        return imageUrl(this.image.url, options)
      },
    },
  }
</script>

<style>
  .full-width-image {
    width: 100%;
    height: 43vh;
    margin: 0 auto;
    overflow: hidden;
  }

  .full-width-image__img::after {
    content: attr(alt);
    display: block;
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
  }

  .full-width-image__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }

  @media (min-width: 720px) {
    .full-width-image {
      height: 53vh;
    }
  }

  @media (min-width: 1440px) {
    .full-width-image {
      width: 1440px;
    }
  }
</style>
