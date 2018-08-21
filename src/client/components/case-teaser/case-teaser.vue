<template>
  <section class="case-teaser grid">
    <div class="case-teaser__image">
      <responsive-image :image="image" />
    </div>
    <header class="case-teaser__header">
      <h2 class="case-teaser__title h2">
        Self-service baggage drop-off with a web UI
      </h2>
    </header>
  </section>
</template>

<script>
import { ResponsiveImage } from '~/components'

export default {
  components: {
    ResponsiveImage
  },
  props: {
    image : {
      type: Object,
      default: () => {},
    }
  }
}
</script>

<style>
.case-teaser {
  margin: 0 0 var(--spacing-large) 0;
}

.case-teaser__header {
  margin: var(--spacing-large) 0;
}

.case-teaser__title {
  grid-column: content;
  grid-column-start: 2;
}

.case-teaser__image {
  grid-column-start: 1;
  grid-column-end: 20;
}

.case-teaser__header::after {
  content: '';
  margin-top: var(--spacing-larger);
  width: 60px;
  height: 2px;
  border-bottom: 2px solid var(--very-dim);
  position: absolute;
}

@media (min-width: 720px) {
  .case-teaser {
    grid-row: 1;
  }

  .case-teaser__image {
    grid-column: content-left;
    grid-column-start: 1;
    grid-row: 1;
  }

  .case-teaser__image .responsive-image__sizer {
    margin-right: 0;
  }

  .case-teaser__header {
    grid-column: content-right;
    grid-row: 1;
    align-self: center;
    margin: 0;
  }

  .case-teaser__title {
    grid-column-end: 2;
  }

  .case-teaser__header::after {
    border-bottom: none;
  }
}

@media (min-width: 1100px) {
  .case-teaser__title {
    grid-column: content-left;
  }

  .case-teaser__header {
    grid-column-start: 31;
    grid-column-end: 46;
  }
}
</style>
