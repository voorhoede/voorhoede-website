<template>
  <div class="generic-text-block">
    <h2 v-if="title" class="generic-text-block__title h4">{{ title }}</h2>

    <rich-text-block class="generic-text-block__body" :text="body" />

    <dato-image
      v-if="image"
      class="generic-text-block__image"
      :src="image.url"
      alt=""
      :width="image.width"
      :height="image.height"
      sizes="80vw"
    />
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      body: {
        type: String,
        required: true
      },
      image: {
        type: Object,
        default: null,
        validator(image) {
          if (!image) {
            return true
          }

          return image && typeof(image.url) === 'string'
        },
      }
    },
    methods: {
        imageUrl(image, options) {
          return imageUrl(image, options)
        }
      }
    }
</script>

<style>
  :root {
    --image-height: 10rem;
  }

  .generic-text-block {
    display: flex;
    flex-direction: column;
  }

  .generic-text-block__title {
    margin-bottom: var(--spacing-smaller);
  }

  .generic-text-block__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: left top;
  }

  @media (min-width: 720px) {
    .generic-text-block {
      display: grid;
      grid-template-rows: repeat(2, auto);
      grid-template-columns: 63% 1fr; /* 63% == 550(text)/877(total width)*100 from design  */
      grid-row-gap: var(--spacing-smaller);
      grid-column-gap: var(--spacing-large);
    }

    .generic-text-block__title {
      margin: 0;
      grid-row: 1;
    }

    .generic-text-block__body {
      grid-column: 1;
      grid-row: 2;
    }

    .generic-text-block__image {
      min-height: var(--image-height);
    }
  }

  @media (min-width: 1100px) {
    .generic-text-block {
      grid-column-gap: var(--spacing-big);
    }
  }
</style>
