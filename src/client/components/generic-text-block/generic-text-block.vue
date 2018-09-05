<template>
  <section class="generic-text-block">
    <div class="generic-text-block__content">
      <h2 class="generic-text-block__title h4">{{ title }}</h2>
      <rich-text-block :text="body"/>
    </div>
    <div v-if="image" class="generic-text-block__image-container">
      <img class="generic-text-block__image" :src="image.url" :alt="image.alt">
    </div>
  </section>
</template>

<script>
  import { RichTextBlock } from '~/components'

  export default {
    components: {
      RichTextBlock
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

          return typeof(image.width) === 'number' && typeof(image.height) === 'number'
            && typeof(image.format) === 'string' && typeof(image.url) === 'string'
        },
      }
    }
  }
</script>

<style>
  .generic-text-block {
    display: flex;
    flex-direction: column;
  }

  .generic-text-block__image-container {
    order: 1;
    margin-bottom: var(--spacing-small);
  }

  .generic-text-block__image {
    width: 100%;
  }

  .generic-text-block__content {
    order: 2;
  }

  .generic-text-block__title {
    margin-bottom: var(--spacing-tiny);
  }

  @media (min-width: 720px) {
    .generic-text-block {
      flex-direction: row;
      justify-content: space-between;
    }

    .generic-text-block__image-container {
      order: 2;
      flex-grow: 1;
    }

    .generic-text-block__content {
      order: 1;
      flex: 1 0 auto;
      max-width: 25rem;
      margin-right: var(--spacing-big);
    }
  }

  @media (min-width: 1100px) {
    .generic-text-block__content {
      max-width: 35rem;
    }
  }
</style>
