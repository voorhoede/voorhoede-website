<template>
  <figure
    class="image-with-caption"
    :class="`image-with-caption--${captionPosition}`"
  >
    <dato-image
      class="image-with-caption__image"
      :src="image.url"
      :alt="image.alt || ''"
      :width="image.width"
      :height="image.height"
      loading="eager"
      :sizes="image.sizes"
    />
    <figcaption
      v-if="caption"
      class="image-with-caption__caption"
      :class="`${captionPosition === 'bottom' ? 'body-detail' : 'pullquote font-bold'}`"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  caption: string,
  image: {
    width: number,
    height: number,
    url: string,
    alt?: string,
    sizes: string,
  },
  captionPosition?: 'left' | 'right' | 'bottom'
}>(), {
  captionPosition: 'bottom'
})
</script>

<style>
  :root {
    --max-width-description: 230px;
  }

  .image-with-caption__image {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: auto;
  }

  .image-with-caption__caption {
    margin-top: var(--spacing-smaller);
  }

  .image-with-caption--bottom .image-with-caption__caption {
    text-align: center;
  }

  @media (min-width: 720px) {
    .image-with-caption--right, .image-with-caption--left {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .image-with-caption--left {
      flex-direction: row-reverse;
    }

    .image-with-caption--right .image-with-caption__image,
    .image-with-caption--left .image-with-caption__image {
      width: 50%;
    }

    .image-with-caption--right .image-with-caption__caption,
    .image-with-caption--left .image-with-caption__caption {
      margin-top: 0;
      width: 50%;
      max-width: var(--max-width-description);
      margin: 0 var(--spacing-big);
      align-self: center;
    }
  }
</style>
