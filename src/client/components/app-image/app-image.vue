<template>
  <div
    class="app-image"
    :class="{ 'app-image--pastel' : svgFormat === false }">
    <no-script>
      <div
        v-if="svgFormat"
        class="app-image__picture"
      >
        <!-- Safari fix for animated svgs -->
        <object
          class="app-image__img"
          :data="image.url"
          type="image/svg+xml"
          tabindex="-1"
        />
      </div>
      <picture
        v-else
        class="app-image__picture"
      >
        <img
          class="app-image__img"
          :src="image.url"
          :alt="image.alt"
        >
      </picture>
    </no-script>
    <lazy-load>
      <div
        v-if="svgFormat"
        class="app-image__picture"
      >
        <!-- Safari fix for animated svgs -->
        <object
          class="app-image__img"
          :data="imageUrl({
            w: width,
            h: cropAndKeepRatio ? width : null,
            fit: cropAndKeepRatio ? 'crop': null })"
          type="image/svg+xml"
          tabindex="-1"
        />
      </div>
      <picture
        v-else
        class="app-image__picture"
      >
        <!--[if IE 9]><video style="display: none;"><![endif]-->
        <source type="image/webp" :srcset="imageUrl({ fm: 'webp', w: width })">
        <source :type="`image/${image.format}`" :srcset="imageUrl({ w: width })">
        <!--[if IE 9]></video><![endif]-->
        <img
          class="app-image__img"
          :src="imageUrl({
            w: width,
            h: cropAndKeepRatio ? width : null,
            fit: cropAndKeepRatio ? 'crop': null })"
          :alt="image.alt">
      </picture>
    </lazy-load>
  </div>
</template>

<script>
  import LazyLoad from '../lazy-load'
  import imageUrl from '../../lib/image-url'
  import NoScript from '../no-script'

  export default {
    components: {
      LazyLoad,
      NoScript
    },
    props: {
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
      }
    },
    computed: {
      svgFormat () {
        return this.image.url.includes('.svg')
      }
    },
    mounted() {
      const pixelRatio = window.devicePixelRatio || 1
      const cssWidth = this.$el.getBoundingClientRect().width
      const width = Math.ceil(cssWidth * pixelRatio / this.widthStep) * this.widthStep
      this.width = Math.min(width, this.image.width)
    },
    methods: {
      imageUrl(options) {
        return imageUrl(this.image.url, options)
      },
    },
  }
</script>

<style>
  .app-image {
    width: 100%;
    height: 100%;
  }

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
    content: "";
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

  .app-image__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }
</style>
