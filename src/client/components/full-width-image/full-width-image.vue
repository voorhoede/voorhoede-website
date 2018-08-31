<template>
  <figure class="full-width-image">
    <lazy-load>
      <picture class="full-width-image__picture">
        <!--[if IE 9]><video style="display: none;"><![endif]-->
        <source type="image/webp" :srcset="imageUrl({ fm: 'webp', w: width })">
        <source :type="`image/${image.format}`" :srcset="imageUrl({ w: width })">
        <!--[if IE 9]></video><![endif]-->
        <img class="full-width-image__img" :alt="image.alt" :src="imageUrl({ w: width })" >
      </picture>
    </lazy-load>
    <no-script>
      <picture class="full-width-image__picture">
        <img class="full-width-image__img" :alt="image.alt" :src="imageUrl({ w: 500 })" >
      </picture>
    </no-script>
    <figcaption class="full-width-image__caption" v-if="image.title">
      {{ image.title }}
    </figcaption>
  </figure>
</template>

<script>
  import LazyLoad from '../lazy-load'
  import NoScript from '../no-script'
  import imageUrl from '../../lib/image-url'

  export default {
    components: {
      LazyLoad,
      NoScript,
    },
    props: {
      image: {
        type: Object,
        required: true,
        validator(image) {
          return typeof(image.width) === 'number' && typeof(image.height) === 'number'
            && typeof(image.format) === 'string' && typeof(image.url) === 'string'
        },
      }
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
          Object.assign(options, { fit:'crop', 'h': 512, crop: 'faces' })
        }

        return imageUrl(this.image.url, options)
      },
    },
  }
</script>

<style>
  .full-width-image {
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
</style>
