<template>
  <section>
    <figure class="case-teaser grid">
      <div class="case-teaser__image">
        <responsive-image :image="image" />
      </div>
      <figcaption class="case-teaser__header">
        <h2 class="case-teaser__title h2">
          {{ title }}
        </h2>
      </figcaption>
    </figure>
  </section>
</template>

<script>
import { ResponsiveImage } from '~/components'

export default {
  components: {
    ResponsiveImage,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
  :root {
    --border-width: 60px;
  }

  .case-teaser {
    margin: 0 0 var(--spacing-large) 0;
  }

  .case-teaser__header {
    margin: var(--spacing-large) 0;
  }

  .case-teaser__header::after {
    content: '';
    margin-top: var(--spacing-large);
    width: var(--border-width);
    border-bottom: 2px solid var(--very-dim);
    position: absolute;
  }

  .case-teaser__image {
    grid-column-start: 1;
    grid-column-end: 20;
  }

  @media (min-width: 720px) {
    .case-teaser {
      grid-row: 1;
    }

    .case-teaser__header {
      grid-column: content-right;
      grid-column-start: 20;
      grid-row: 1;
      align-self: center;
      margin: 0;
    }

    .case-teaser__header::after {
      border-bottom: none;
    }

    .case-teaser__image {
      grid-column: page-left;
      grid-row: 1;
    }

    .case-teaser__image .responsive-image__sizer {
      margin-right: 0;
    }
  }

  @media (min-width: 1100px) {
    .case-teaser__header {
      grid-column-start: 30;
    }
  }

  @media (min-width: 720px) and (max-width: 960px) {
    .case-teaser__title {
      font-size: 1.9375rem; /* 31px */
    }
  }
</style>
