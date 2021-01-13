<template>
  <div class="image-with-text" :class="{ 'image-with-text--inverse': inverse }">
    <responsive-image :image="image" />
    <div class="image-with-text__body">
      <h3 v-if="title" class="image-with-text__body-title h3">{{ title }}</h3>
      <p class="pullquote">{{ body }}</p>
    </div>
  </div>
</template>

<script>
  import ResponsiveImage from '../responsive-image'

  export default {
    components: { ResponsiveImage },
    props: {
      title: {
        type: String,
        required: true,
      },
      body: {
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
  .image-with-text {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .image-with-text .responsive-image {
    width: 100%;
  }

  .image-with-text__body {
    background-color: var(--white);
    margin-top: calc(-1 * var(--spacing-bigger));
    margin-right: var(--spacing-larger);
    padding: var(--spacing-medium);
    z-index: var(--z-index-low);
  }

  .image-with-text--inverse .image-with-text__body {
    margin-right: 0;
    margin-left: var(--spacing-larger);
  }

  .image-with-text__body-title {
    margin-bottom: var(--spacing-smaller);
  }

  @media (min-width: 720px) {
    .image-with-text {
      padding: var(--spacing-larger) var(--spacing-larger) var(--spacing-larger) 0;
      flex-direction: row;
      background-image: linear-gradient(
        to right,
        transparent,
        transparent 25%,
        var(--white) 25%,
        var(--white) 100%
      );
    }

    .image-with-text--inverse {
      padding: var(--spacing-larger) 0 var(--spacing-larger) var(--spacing-larger);
      flex-direction: row-reverse;
      background-image: linear-gradient(
        to left,
        transparent,
        transparent 25%,
        var(--white) 25%,
        var(--white) 100%
      );
    }

    .image-with-text .responsive-image {
      width: 50%;
    }

    .image-with-text__body {
      width: 50%;
      margin-top: 0;
      margin-right: 0;
      margin-left: var(--spacing-large);
      padding: 0;
    }

    .image-with-text--inverse .image-with-text__body {
      margin-right: var(--spacing-large);
      margin-left: 0;
    }
  }

  @media (min-width: 1100px) {
    .image-with-text {
      padding: var(--spacing-big) var(--spacing-larger) var(--spacing-big) 0;
      background-image: linear-gradient(
        to right,
        transparent,
        transparent 30%,
        var(--white) 30%,
        var(--white) 100%
      );
    }

    .image-with-text--inverse {
      padding: var(--spacing-big) 0 var(--spacing-big) var(--spacing-larger);
      background-image: linear-gradient(
        to left,
        transparent,
        transparent 30%,
        var(--white) 30%,
        var(--white) 100%
      );
    }

    .image-with-text .responsive-image {
      width: 60%;
    }

    .image-with-text__body {
      width: 40%;
      margin-left: var(--spacing-big);
    }
  }
</style>
