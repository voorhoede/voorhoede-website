<template>
  <div class="generic-text-block">
    <h3 v-if="title" class="generic-text-block__title h4">{{ title }}</h3>
    <rich-text-block class="generic-text-block__body" :text="body"/>
    <lazy-load v-if="image" class="generic-text-block__image-container">
      <img class="generic-text-block__image" :src="image.url" alt="">
    </lazy-load>
  </div>
</template>

<script>
  import { RichTextBlock, LazyLoad } from '~/components'

  export default {
    components: {
      RichTextBlock,
      LazyLoad
    },
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

  .generic-text-block__image-container {
    order: -1;
    margin-bottom: var(--spacing-smaller);
    height: var(--image-height);
    text-align: center;
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
      grid-template-columns: 63% 1fr; /* 63% == 550(text)/877(total width)*100 from design  */
      grid-gap: var(--spacing-smaller) var(--spacing-large);
    }

    .generic-text-block__title {
      margin: 0;
      grid-row: 1;
    }

    .generic-text-block__body {
      grid-column: 1;
      grid-row: 2;
    }

    .generic-text-block__image-container {
      order: 0;
      margin: 0;
      height: 100%;
      text-align: left;
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
