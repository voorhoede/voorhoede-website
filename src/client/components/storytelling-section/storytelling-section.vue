<template>
  <aside class="storytelling-section grid">
    <h2 class="storytelling-section__title h3">{{ title }}</h2>
    <section
      class="storytelling-section__item"
      :class="{ 'storytelling-section__item--odd': index % 2 === 0 }"
      v-for="(item, index) in items"
      :key="index"
    >
      <div class="storytelling-section__image-container">
        <img class="storytelling-section__image" v-if="item.image" :src="item.image.url">
      </div>
      <div class="storytelling-section__card">
        <h3 class="body font-bold">{{ item.title }}</h3>
        <rich-text-block :text="item.body" />
      </div>
    </section>
  </aside>
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
        default: ''
      },
      items: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(item => {
            const isImageValid = (item.image && item.image.url) ? typeof item.image.url === 'string' : false

            return (
              item.title &&
              item.body &&
              item.image ? isImageValid : true
            )
          })
        }
      }
    }
  }
</script>

<style>
  .storytelling-section {
    background-color: var(--paper);
    grid-row-gap: var(--spacing-large);
  }

  .storytelling-section__image-container {
    width: 240px;
    margin: 0 auto var(--spacing-medium) auto;
  }

  .storytelling-section__image {
    width: 100%;
  }

  .storytelling-section__card {
    background-color: var(--white);
    padding: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    @supports (display: grid) {
      .storytelling-section__item {
        display: grid;
        grid-template-columns: 33.33% 33.33% 33.33%;
      }
    }

    .storytelling-section__image-container {
      width: auto;
      grid-column: 1;
    }

    .storytelling-section__card {
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }
</style>
