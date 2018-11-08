<template>
  <section class="image-grid">
    <h3 v-if="title" class="image-grid__title h2">{{ title }}</h3>
    <ul class="image-grid__list">
      <li
        v-for="item in items"
        :key="item.title"
        class="image-grid__item"
        :class="{
          'image-grid__item--highlighted': item.isHighlighted,
          'image-grid__item--full-width': item.isFullWidth }">
        <app-image v-if="item.image" :image="item.image" />
        <div v-if="item.title && item.description" class="image-grid__item-content">
          <h4 class="image-grid__item-title h3">{{ item.title }}</h4>
          <p class="body-petite">{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import { AppImage } from '../../components'

  export default {
    components: { AppImage },
    props: {
      title: {
        type: String,
        default: '',
      },
      items: {
        type: Array,
        default: () => [],
        validator: (items) => {
          return (
            items.every(item => {
              return item instanceof Object &&
                typeof item.title === 'string' &&
                typeof item.description === 'string' &&
                typeof item.image === 'object' &&
                typeof item.isFullWidth === 'boolean' &&
                typeof item.isHighlighted === 'boolean'
            })
          )
        },
      }
    }
  }
</script>

<style>

  @import '../app-core/variables.css';

  .image-grid {
    display: inline-block;
    width: 100%;
  }

  .image-grid__title {
    margin-bottom: var(--spacing-medium);
    text-align: center;
  }

  .image-grid__list {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(4, 50vw);
  }

  .image-grid__item {
    background-color: var(--white);
  }

  .image-grid__item--highlighted {
    background-color: var(--brand-yellow);
  }

  .image-grid__item--full-width {
    grid-column: span 2;
  }

  .image-grid__item-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: var(--spacing-small);
  }

  @media (min-width: 720px) {
    .image-grid {
      flex-direction: row;
    }

    .image-grid__list {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 33vw);
    }

    .image-grid__item--full-width {
      grid-column: span 3;
    }

    .image-grid__item-content {
      padding: var(--spacing-medium);
    }
  }

  @media (min-width: 1100px) {
    .image-grid__list {
      grid-template-columns: repeat(4, 25%);
      grid-template-rows: repeat(2, 25vw);
    }

    .image-grid__item--full-width {
      grid-column: span 2;
    }

    .image-grid__item-content {
      padding: var(--spacing-large);
    }
  }

  @media (min-width: 1440px) {
    .image-grid__list {
      grid-template-rows: repeat(2, 360px);
    }
  }
</style>
