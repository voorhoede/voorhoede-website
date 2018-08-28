<template>
  <section class="faq-item">
    <div class="faq-item__content">
      <h2 class="faq-item__title h4">{{ title }}</h2>
      <rich-text-block :text="body"/>
    </div>
    <div v-if="image" class="faq-item__image-container">
      <img class="faq-item__image" :src="image.url" :alt="image.alt">
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
      body: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: null
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
  .faq-item {
    display: flex;
    flex-direction: column;
  }

  .faq-item__image-container {
    order: 1;
    margin-bottom: var(--spacing-small);
  }

  .faq-item__image {
    width: 100%;
  }

  .faq-item__content {
    order: 2;
  }

  .faq-item__title {
    margin-bottom: var(--spacing-tiny);
  }

  @media (min-width: 720px) {
    .faq-item {
      flex-direction: row;
      justify-content: space-between;
    }

    .faq-item__image-container {
      order: 2;
      flex-grow: 1;
    }

    .faq-item__content {
      order: 1;
      flex: 1 0 auto;
      max-width: 25rem;
      margin-right: var(--spacing-big);
    }
  }

  @media (min-width: 1100px) {
    .faq-item__content {
      max-width: 35rem;
    }
  }
</style>
