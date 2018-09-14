<template>
  <div class="image-with-description"
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
  :root {
    --max-width-description: 230px;
  }

  .image-with-description {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .image-with-description__description {
    margin: var(--spacing-large) 0;
  }

  @media (min-width: 720px) {
    .image-with-description {
      display: flex;
      flex-direction: row;
    }

    .image-with-description__description {
      width: 50%;
      max-width: var(--max-width-description);
      margin: 0 var(--spacing-big);
      align-self: center;
    }

    .image-with-description--inverse {
      flex-direction: row-reverse;
    }

    .image-with-description__image {
      width: 50%;
    }
  }
</style>
