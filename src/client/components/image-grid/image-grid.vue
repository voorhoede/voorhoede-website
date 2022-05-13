<template>
  <section class="image-grid">
    <h2 v-if="title" class="image-grid__title h2">{{ title }}</h2>
    <ul class="image-grid__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="image-grid__item"
        :class="{
          'image-grid__item--highlighted': item.isHighlighted,
          'image-grid__item--full-width': item.isFullWidth }">
        <app-image v-if="item.image" :image="item.image" />
        <div v-if="item.title && item.description" class="image-grid__item-content">
          <h3 class="image-grid__item-title h3">{{ item.title }}</h3>
          <p class="body-small">{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
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
              return typeof item === 'object' &&
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
  .image-grid {
    display: inline-block;
    width: 100%;
    grid-column: var(--grid-page);
  }

  .image-grid__title {
    margin-bottom: var(--spacing-medium);
    text-align: center;
  }

  .image-grid__list {
    display: flex;
    flex-wrap: wrap;
  }

  .image-grid__item {
    flex: 0 0 50%;
    height: 250px;
    background-color: var(--white);
  }

  .image-grid__item--full-width {
    flex: 0 0 100%;
  }

  .image-grid__item--highlighted {
    background-color: var(--brand-yellow);
  }

  .image-grid__item-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--spacing-small);
    height: 100%;
  }

  @media (min-width: 720px) {
    .image-grid__item {
      flex: 0 0 33.33%;
      height: 360px;
    }

    .image-grid__item--full-width {
      order: 7;
      flex: 0 0 100%;
    }

    .image-grid__item-content {
      padding: var(--spacing-medium);
    }
  }

  @media (min-width: 1100px) {
    .image-grid__item {
      flex: 0 0 25%;
    }

    .image-grid__item--full-width {
      order: initial;
      flex: 0 0 50%;
    }

    .image-grid__item-content {
      padding: var(--spacing-large);
    }
  }
</style>
