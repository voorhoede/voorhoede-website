<template>
  <div class="image-with-caption">
    <dato-image
      class="image-with-caption__image"
      :src="image.url"
      :alt="image.alt || ''"
      :width="image.width"
      :height="image.height"
      loading="eager"
      :sizes="image.sizes"
    />
    <div
      v-if="caption"
      class="image-with-caption__caption body-detail"
    >
      {{ caption }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  caption: string,
  image: {
    width: number,
    height: number,
    url: string,
    alt?: string,
    sizes: string,
  },
}>()
</script>

<style>
  .image-with-caption__image {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: auto;
  }

  .image-with-caption__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }
</style>
