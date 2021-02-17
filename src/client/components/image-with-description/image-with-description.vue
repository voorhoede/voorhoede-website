<template>
  <figure class="image-with-description" :class="{ 'image-with-description--inverse': inverse }">
    <div class="image-with-description__image">
      <responsive-image :image="image" />
    </div>
    <figcaption
      v-if="description"
      class="pullquote font-bold image-with-description__description">
      {{ description }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    inverse: {
      type: Boolean,
      default: false,
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
    flex-direction: column-reverse;
    width: 100%;
  }

  .image-with-description__description {
    margin: 0 0 var(--spacing-small);
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
