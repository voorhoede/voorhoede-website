<template>
  <section class="case-teaser">
    <div class="case-teaser__image">
      <responsive-image :image="image" />
    </div>
    <div class="case-teaser__header">
      <h2 class="case-teaser__title h2">
        {{ title }}
      </h2>
    </div>
  </section>
</template>

<script>
import { ResponsiveImage } from '~/components'

export default {
  components: {
    ResponsiveImage
  },
  props: {
    title: {
      type: String,
      required: true
    },
    image : {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
  :root {
    --text-block-max-width: 360px;
    --page-max-width: 1440px;
  }

  .case-teaser {
    grid-column: page;
    display: flex;
    flex-direction: column;
    margin: 0 0 var(--spacing-large) 0;
  }

  .case-teaser__header {
    flex-basis: 100%;
    margin: var(--spacing-large) var(--grid-margin);
  }

  .case-teaser__header::after {
    content: '';
    margin-top: var(--spacing-large);
    width: 60px;
    border-bottom: 2px solid var(--very-dim);
    position: absolute;
  }

  .case-teaser__image {
    flex-basis: 100%;
  }

  @media (min-width: 720px) {
    .case-teaser {
      flex-direction: row;
      grid-column: page;
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

    .case-teaser__image .responsive-image__sizer {
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
