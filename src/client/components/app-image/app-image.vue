<template>
  <component
    :class="{ 'app-image--pastel' : svgFormat === false }"
    :is="(lazyLoad) ? 'LazyLoad' : 'div'"
  >
    <div
      v-if="svgFormat"
      class="app-image__picture"
    >
      <!-- Safari fix for animated svgs -->
      <object
        class="app-image__img"
        :data="imageUrl()"
        type="image/svg+xml"
        tabindex="-1"
        :aria-label="imageAlt"
      />
    </div>
    <picture
      v-else
      class="app-image__picture"
    >
      <!--[if IE 9]><video style="display: none;"><![endif]-->
      <source
        type="image/webp"
        :srcset="imageUrl({
          fm: 'webp',
          ...cropOptions
        })">
      <source
        :type="`image/${image.format}`"
        :srcset="imageUrl({
          ...cropOptions
        })">
      <!--[if IE 9]></video><![endif]-->
      <img
        class="app-image__img"
        :src="imageUrl({
          ...cropOptions
        })"
        :alt="imageAlt"
        :width="width"
        :height="width"
      >
    </picture>
  </component>
</template>

<script>
  import imageUrl from '../../lib/image-url'
  import LazyLoad from '../lazy-load/lazy-load'

  export default {
    components: {
      LazyLoad,
    },
    props: {
      caption: {
        type: String,
        default: '',
      },
      image: {
        type: Object,
        required: true,
        validator(image) {
          let imageDimensions =
            (image.width && image.height) ?
            typeof(image.width && image.height) === 'number' : true

          let imageFormat = image.format ? typeof(image.format === 'string') : true

          return imageDimensions && imageFormat && typeof(image.url) === 'string'
        },
      },
      lazyLoad: {
        type: Boolean,
        default: true
      },
      widthStep: {
        type: Number,
        default: 100,
      },
      cropAndKeepRatio: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        width: null,
        cropOptions: null
      }
    },
    computed: {
      imageAlt () {
        return this.image.alt ? this.image.alt : ''
      },
      svgFormat () {
        return this.image.url.includes('.svg')
      }
    },
    mounted() {
      const pixelRatio = window.devicePixelRatio || 1
      const cssWidth = this.$el.getBoundingClientRect().width
      const width = Math.ceil(cssWidth * pixelRatio / this.widthStep) * this.widthStep
      this.width = Math.min(width, this.image.width)
      const cropOptions = {
        w: this.width
      }
      if (this.cropAndKeepRatio) {
        cropOptions.h = this.width
        cropOptions.fit = 'crop'

        if (this.image.focalPoint) {
          cropOptions.crop = 'focalpoint'
          cropOptions['fp-x'] = this.image.focalPoint.x
          cropOptions['fp-y'] = this.image.focalPoint.y
        }
      }
      this.cropOptions = cropOptions
    },
    methods: {
      imageUrl(options) {
        return imageUrl(this.image.url, options)
      },
    },
  }
</script>

<style>
  .app-image--pastel {
    background-color: var(--bg-pastel);
  }

  .app-image__picture,
  .app-image__img {
    display: block;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .app-image__img::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: var(--bg-pastel);
  }

  .app-image__img::after {
    content: attr(alt);
    display: block;
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
  }
</style>
