<template>
  <figure class="full-width-image">
    <dato-image
      :src="image.url"
      alt=""
      :width="image.width"
      :height="image.height"
      loading="eager"
      sizes="100vw"
    />
    <figcaption
      class="full-width-image__caption"
      v-if="image.title"
    >
      {{ image.title }}
    </figcaption>
  </figure>
</template>

<script>
  export default {
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
  }
</script>

<style>
  .full-width-image {
    width: 100%;
    height: 300px;
    margin: 0 auto;
    overflow: hidden;
    grid-column: var(--grid-page);
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
      height: 400px;
    }
  }

  @media (min-width: 1440px) {
    .full-width-image {
      height: 700px;
      width: 1440px;
    }
  }
</style>
