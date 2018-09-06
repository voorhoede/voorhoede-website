<template>
  <div class="generic-text-block">
    <h2 class="generic-text-block__title h4">{{ title }}</h2>
    <rich-text-block class="generic-text-block__body" :text="body"/>
    <lazy-load v-if="image" class="generic-text-block__image-container">
      <img class="generic-text-block__image" :src="image.url" :alt="image.alt">
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
        required: true
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

          return typeof(image.url) === 'string' && typeof(image.alt) === 'string'
        },
      }
    }
  }
</script>

<style>
  :root {
    --image-height: 10rem;
    --list-bullet-size: 2px;
  }

  .generic-text-block {
    display: grid;
    grid-row-gap: var(--spacing-smaller);
  }

  .generic-text-block__body li::before {
    content: '';
    display: inline-block;
    background: var(--black);
    background: currentColor;
    height: var(--list-bullet-size);
    width: var(--list-bullet-size);
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    left: calc(-1 * var(--spacing-small));
  }

  .generic-text-block__image-container {
    height: var(--image-height);
    grid-row: 1;
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
      grid-template-columns: 63% 1fr; /* 63% == 550(text)/877(total width)*100 from design  */
      grid-column-gap: var(--spacing-large);
    }

    .generic-text-block__body {
      grid-row: 2;
    }

    .generic-text-block__image-container {
      height: 100%;
      grid-row: 2;
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
