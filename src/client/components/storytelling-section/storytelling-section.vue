<template>
  <aside class="storytelling-section-bg">
    <div class="storytelling-section">
      <h2 class="storytelling-section__title h3">{{ title }}</h2>
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
    </div>
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
    --storytelling-image-height: 150px;
    --max-width-storytelling-section: 715px;
    --max-width-storytelling-item: 470px;
  }

  .storytelling-section-bg {
    width: 100%;
    background-color: var(--paper);
  }

  .storytelling-section {
    display: flex;
    flex-direction: column;
    max-width: var(--max-width-storytelling-section);
    margin-left: auto;
    margin-right: auto;
  }

  .storytelling-section__image {
    margin-bottom: var(--spacing-medium);
    height: var(--storytelling-image-height);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .storytelling-section__card {
    background-color: var(--white);
    padding: var(--spacing-medium);
  }

  .storytelling-section__title {
    margin-bottom: var(--spacing-large);
  }
  
  .storytelling-section__item:not(:last-child) {
    margin-bottom: var(--spacing-larger);
  }

  @media (min-width: 720px) {
    .storytelling-section__item:nth-child(odd) {
      align-self: flex-end;
    }

    .storytelling-section__item {
      max-width: var(--max-width-storytelling-item);
      align-items: center;
      margin-bottom: var(--spacing-larger);
    }

    .storytelling-section__image {
      margin-bottom: 0;
    }

    .storytelling-section__card {
      display: inline-block;
    }
  }
</style>
