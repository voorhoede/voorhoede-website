<template>
  <div class="gallery-block">
    <dato-image
      v-for="image in images"
      :key="image.id"
      class="gallery-block__image"
      :src="image.url"
      :width="image.width"
      :height="image.height"
      :alt="image.alt || ''"
      sizes="(min-width: 1100px) 650px, 45vw"
      loading="lazy"
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
    flex-grow: 1;
    flex-basis: 50%;
    width: 100%;
    height: auto;
  }

  .gallery-block__image .image-with-caption__image {
    padding-bottom: 0;
    height: 100%;
  }

  @media (min-width: 720px) {
    .gallery-block {
      margin-left: calc(-1 * var(--spacing-big));
      margin-right: calc(-1 * var(--spacing-big));
    }

    .gallery-block__image {
      flex-basis: 33%;
    }
  }

  @media (min-width: 1100px) {
    .gallery-block {
      margin-left: calc(-2 * var(--spacing-bigger));
      margin-right: calc(-2 * var(--spacing-bigger));
    }

    .gallery-block__image {
      flex-basis: 25%;
    }
  }
</style>
