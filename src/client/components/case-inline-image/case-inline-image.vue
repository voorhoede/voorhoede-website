<template>
  <div class="case-inline-image grid"
       :class="{
         'case-inline-image--inverse': inverse === true
  }">
    <figure class="case-inline-image__image">
      <responsive-image :image="image" />
    </figure>
    <figcaption class="case-inline-image__caption">
      <h4 class="pullquote font-bold">
        {{ title }}
      </h4>
    </figcaption>
  </div>
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
    inverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.case-inline-image {
  margin: 0 0 var(--spacing-large) 0;
}

.case-inline-image__caption {
  margin: var(--spacing-large) 0;
}

.case-inline-image__image {
  grid-column-start: 1;
  grid-column-end: 20;
}

@media (min-width: 720px) {
  .case-inline-image {
    grid-row: 1;
  }

  .case-inline-image__caption {
    max-width: 233px;
    grid-column: content-right;
    grid-row: 1;
    align-self: center;
    margin: 0;
  }

  .case-inline-image--inverse .case-inline-image__caption {
    grid-column: content-left;
    grid-column-start: 6;
  }

  .case-inline-image--inverse .case-inline-image__image {
    grid-column: content-right;
  }

  .case-inline-image__image {
    grid-column: page-left;
    grid-row: 1;
  }

  .case-inline-image__image .responsive-image__sizer {
    margin-right: 0;
  }
}

@media (min-width: 1100px) {
  .case-inline-image__image {
    grid-column-start: 6;
  }

  .case-inline-image--inverse .case-inline-image__caption {
    grid-column-start: 10;
  }

  .case-inline-image--inverse .case-inline-image__image {
    grid-column-end: 46;
    grid-column-start: 24;
  }

  .case-inline-image__caption {
    grid-column-start: 30;
  }
}

@media (min-width: 720px) and (max-width: 960px) {
  .case-inline-image__title {
    font-size: 1.9375rem; /* 31px */
  }
}
</style>
