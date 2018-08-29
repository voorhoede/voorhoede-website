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
      grid-column-start: 21;
      grid-column-end: 30;
      grid-row: 1;
      align-self: center;
      margin: 0;
    }

    .image-with-description--inverse .image-with-description__description {
      grid-column-start: 6;
      grid-column-end: 15;
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

    .image-with-description__description {
      grid-column-start: 30;
      grid-column-end: 39;
    }

    .image-with-description--inverse .image-with-description__description {
      grid-column-start: 10;
      grid-column-end: 19;
    }

    .image-with-description--inverse .image-with-description__image {
      grid-column-start: 24;
      grid-column-end: 46;
    }
  }
</style>
