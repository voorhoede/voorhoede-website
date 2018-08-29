<template>
  <div class="image-with-description grid"
       :class="{
         'image-with-description--inverse': inverse
  }">
    <div class="image-with-description__image">
      <responsive-image :image="image" />
    </div>
    <div class="image-with-description__description">
      <h4 class="pullquote font-bold">
        {{ description }}
      </h4>
    </div>
  </div>
</template>

<script>
import { ResponsiveImage } from '~/components'

export default {
  components: {
    ResponsiveImage
  },
  props: {
    description: {
      type: String,
      required: true
    },
    image: {
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
  .image-with-description {
    margin: 0 0 var(--spacing-large) 0;
  }

  .image-with-description__description {
    margin: var(--spacing-large) 0;
  }

  .image-with-description__image {
    grid-column-start: 1;
    grid-column-end: 20;
  }

  @media (min-width: 720px) {
    .image-with-description {
      grid-row: 1;
    }

    .image-with-description__description {
      max-width: 233px;
      grid-column: content-right;
      grid-column-start: 21;
      grid-row: 1;
      align-self: center;
      margin: 0;
    }

    .image-with-description--inverse .image-with-description__description {
      grid-column: content-left;
      grid-column-start: 6;
    }

    .image-with-description--inverse .image-with-description__image {
      grid-column: content-right;
    }

    .image-with-description__image {
      grid-column: page-left;
      grid-row: 1;
    }

    .image-with-description__image .responsive-image__sizer {
      margin-right: 0;
    }
  }

  @media (min-width: 1100px) {
    .image-with-description__image {
      grid-column-start: 6;
    }

    .image-with-description--inverse .image-with-description__description {
      grid-column-start: 10;
    }

    .image-with-description--inverse .image-with-description__image {
      grid-column-end: 46;
      grid-column-start: 24;
    }

    .image-with-description__description {
      grid-column-start: 30;
    }
  }

  @media (min-width: 720px) and (max-width: 960px) {
    .image-with-description__title {
      font-size: 1.9375rem; /* 31px */
    }
  }
</style>
