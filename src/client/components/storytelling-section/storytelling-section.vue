<template>
  <aside class="storytelling-section grid">
    <div class="storytelling-section__header">
      <h2 class="storytelling-section__title h3">{{ title }}</h2>
    </div>
    <section
      class="storytelling-section__item"
      v-for="item in items"
      :key="item.title">

      <div
        class="storytelling-section__image"
        v-if="item.image"
        :style="`background-image: url(${item.image.url})`" />

      <div class="storytelling-section__card">
        <h3 class="body-big font-bold">{{ item.title }}</h3>
        <rich-text-block :text="item.body" />
      </div>
    </section>
  </aside>
</template>

<script>
  import { RichTextBlock } from '~/components'

  export default {
    components: {
      RichTextBlock,
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
  @import '../app-core/variables.css';
  
  :root {
    --section-max-width: 640px;
  }

  .storytelling-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--paper);
    grid-row-gap: var(--spacing-larger);
    grid-column: var(--grid-content);
  }

  .storytelling-section__image {
    margin-bottom: var(--spacing-medium);
    height: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .storytelling-section__card {
    background-color: var(--white);
    padding: var(--spacing-medium);
  }

  .storytelling-section__item {
    margin-bottom: var(--spacing-larger);
    width: 100%;
  }

  .storytelling-section__header {
    text-align: left;
    width: 100%;
    margin-bottom: var(--spacing-larger);
  }

  @media (min-width: 720px) {
    .storytelling-section__header {
      max-width: var(--section-max-width);
    }
 
    .storytelling-section__title {
      grid-column-start: 5;
    }

    .storytelling-section__item {
      grid-column-start: 4;
      grid-column-end: 32;
      display: grid;
      grid-column-gap: var(--spacing-small);
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      max-width: var(--section-max-width);
    }

    .storytelling-section__image {
      margin-bottom: 0;
    }

    .storytelling-section__card {
      display: inline-block;
      grid-column-start: 2;
      grid-column-end: 4;
    }

    .storytelling-section__item:nth-of-type(2n) .storytelling-section__image-container {
      grid-column: 3;
      grid-row: 1;
    }

    .storytelling-section__item:nth-of-type(2n) .storytelling-section__card {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row: 1;
    }
  }

  @media (min-width: 1100px) {
    .storytelling-section__title {
      grid-column-start: 11;
    }

    .storytelling-section__item {
      grid-column-start: 10;
      grid-column-end: 43;
    }
  }

  @media (min-width: 1440px) {
    .storytelling-section__title {
      grid-column-start: 14;
    }

    .storytelling-section__item {
      grid-column-start: 13;
      grid-column-end: 40;
    }
  }
</style>
