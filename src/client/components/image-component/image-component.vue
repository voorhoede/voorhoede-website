<template>
  <div class="image-component">
    <lazy-load>
      <picture class="image-component__picture">
        <!--[if IE 9]><video style="display: none;"><![endif]-->
        <source type="image/webp" :srcset="imageUrl({ fm: 'webp', w: width })">
        <source :type="`image/${image.format}`" :srcset="imageUrl({ w: width })">
        <!--[if IE 9]></video><![endif]-->
        <img class="image-component__img" :alt="image.alt" :src="imageUrl({ w: width })" >
      </picture>
    </lazy-load>
    <no-script>
      <picture class="image-component__picture">
        <img class="image-component__img" :alt="image.alt" :src="imageUrl({ w: 500 })" >
      </picture>
    </no-script>
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
          return typeof(image.width) === 'number' && typeof(image.height) === 'number'
            && typeof(image.format) === 'string' && typeof(image.url) === 'string'
        },
      },
      widthStep: {
        type: Number,
        default: 100,
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
  .image-component {
    width: 100%;
    height: 100%;
    background-color: var(--bg-pastel);
  }

  .image-component__img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .image-component__img::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: var(--bg-pastel);
  }

  .image-component__img::after {
    content: attr(alt);
    display: block;
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
  }

  .image-component__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }
</style>
