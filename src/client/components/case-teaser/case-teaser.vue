<template>
  <section class="case-teaser grid"
           :class="{
             'case-teaser--small': small === true,
             'case-teaser--inverse': inverse === true
  }">
    <div class="case-teaser__image">
      <responsive-image :image="image" />
    </div>
    <div class="case-teaser__header">
      <h4 class="pullquote font-bold" v-if="small">
        {{ title }}
      </h4>
      <h2 class="case-teaser__title h2" v-else>
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
    },
    small: {
      type: Boolean,
      default: false
    },
    inverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.case-teaser {
  margin: 0 0 var(--spacing-large) 0;
}

.case-teaser--small .case-teaser__image {
  grid-column-start: 0;
}

.case-teaser--small .case-teaser__header::after {
  display: none;
}

.case-teaser__header {
  margin: var(--spacing-large) 0;
}

.case-teaser__header::after {
  content: '';
  margin-top: var(--spacing-large);
  width: 60px;
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

  .case-teaser--small .case-teaser__header {
    max-width: 233px;
    width: auto;
  }

  .case-teaser--inverse .case-teaser__header {
    grid-column: content-left;
    grid-column-start: 6;
  }

  .case-teaser--inverse .case-teaser__image {
    grid-column: content-right;
  }

  .case-teaser__header {
    grid-column: content-right;
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
  .case-teaser--small .case-teaser__image {
    grid-column-start: 6;
  }

  .case-teaser--inverse .case-teaser__header {
    grid-column-start: 10;
  }

  .case-teaser--inverse .case-teaser__image {
    grid-column-end: 46;
    grid-column-start: 24;
  }

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
