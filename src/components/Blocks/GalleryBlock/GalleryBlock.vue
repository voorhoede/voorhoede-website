<template>
  <section class="gallery-block grid">
    <h2 v-if="data.title" class="gallery-block__title h3">
      {{ data.title }}
    </h2>
    <div class="gallery-block__images">
      <DatoImage
        v-for="image in data.images"
        :key="image.id"
        class="gallery-block__image"
        :src="image.url"
        :width="image.width!"
        :height="image.height!"
        :alt="image.alt || ''"
        sizes="(min-width: 1100px) 650px, 45vw"
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GalleryBlockFragment } from "./GalleryBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import DatoImage from "~/components/Core/DatoImage/DatoImage.vue";

const props = defineProps<{
  data: FragmentOf<typeof GalleryBlockFragment>;
}>();

const data = readFragment<typeof GalleryBlockFragment>(props.data);
</script>

<style scoped>
.gallery-block__title {
  grid-column: var(--grid-content);
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.gallery-block__images {
  display: flex;
  flex-wrap: wrap;
  grid-column: var(--grid-full);
}

.gallery-block__image {
  flex-grow: 1;
  flex-basis: 50%;
  width: 100%;
  height: auto;
}

@media (min-width: 720px) {
  .gallery-block__images {
    margin-left: calc(-1 * var(--spacing-big));
    margin-right: calc(-1 * var(--spacing-big));
  }

  .gallery-block__image {
    flex-basis: 33%;
  }
}

@media (min-width: 1100px) {
  .gallery-block__images {
    margin-left: calc(-2 * var(--spacing-bigger));
    margin-right: calc(-2 * var(--spacing-bigger));
  }

  .gallery-block__image {
    flex-basis: 25%;
  }
}
</style>
