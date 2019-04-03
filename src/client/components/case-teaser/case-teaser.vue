<template>
  <div>
    <figure class="case-teaser grid">
      <div class="case-teaser__image">
        <responsive-image :image="image" />
      </div>
      <figcaption class="case-teaser__header">
        <span class="case-teaser__title h2">
          {{ title }}
        </span>
      </figcaption>
    </figure>
  </div>
</template>

<script>
import ResponsiveImage from '../responsive-image'

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
    --text-block-max-width: 400px;
    --page-max-width: 1440px;
    --border-width: 60px;
  }

  .case-teaser {
    display: flex;
    flex-direction: column;
  }

  .case-teaser__header {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    margin: var(--spacing-large) var(--grid-margin);
  }

  .case-teaser__header::after {
    content: '';
    position: relative;
    margin-top: var(--spacing-large);
    width: var(--border-width);
    border-bottom: 2px solid var(--very-dim);
  }

  .case-teaser__image {
    flex-basis: 100%;
  }

  @media (min-width: 720px) {
    .case-teaser {
      flex-direction: row;
      margin: 0 auto var(--spacing-large) auto;
      width: 100%;
      max-width: var(--page-max-width);
    }

    .case-teaser__header {
      flex-basis: 50%;
      margin-left: var(--spacing-larger);
      align-self: center;
    }

    .case-teaser__title {
      max-width: var(--text-block-max-width);
    }

    .case-teaser__header::after {
      border-bottom: none;
    }

    .case-teaser__image {
      flex: 50% 1 0;
    }

    .case-teaser__image .responsive-image {
      margin-right: 0;
    }
  }

  @media (min-width: 1100px) {
    .case-teaser {
      margin-bottom: var(--spacing-big);
    }

    .case-teaser__header {
      margin-left: var(--spacing-bigger);
    }
  }

  @media (min-width: 720px) and (max-width: 960px) {
    .case-teaser__title {
      font-size: 1.9375rem; /* 31px */
    }
  }
</style>
