<template>
  <div class="gallery-block">
    <responsive-image
      v-for="image in images"
      :key="image.id"
      :image="image"
      class="gallery-block__image"
    />
  </div>
</template>

<script>
  export default {
    props: {
      images: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style>
  .gallery-block {
    display: flex;
    flex-wrap: wrap;
  }

  .gallery-block__image {
    flex: 1 1 50%;
  }

  .gallery-block__image .fixed-ratio {
    padding-bottom: 0;
    height: 100%;
  }

  @media (min-width: 720px) {
    .gallery-block {
      margin-left: calc(-1 * var(--spacing-big));
      margin-right: calc(-1 * var(--spacing-big));
    }

    .gallery-block__image {
      flex: 1 1 33%;
    }
  }

  @media (min-width: 1100px) {
    .gallery-block {
      margin-left: calc(-2 * var(--spacing-bigger));
      margin-right: calc(-2 * var(--spacing-bigger));
    }

    .gallery-block__image {
      flex: 1 1 25%;
    }
  }
</style>
