<template>
  <section class="image-grid">
    <h3 v-if="title" class="image-grid__title h2">{{ title }}</h3>
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
    flex: 0 0 calc(100% / 3);
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
