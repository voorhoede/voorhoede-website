<template>
  <div
    class="image-with-text"
    :class="{
      'image-with-text--inverse': data.imagePosition === 'right',
      'image-with-text--pastel-background':
        data.backgroundColor === BackgroundColor.PastelYellow,
    }"
  >
    <DatoImage
      class="image-with-text__image"
      :src="data.image.url"
      :alt="data.image.alt || ''"
      :width="data.image.width!"
      :height="data.image.height!"
      sizes="(min-width: 1100px) 730px, (min-width: 720px) 40vw, 90vw"
      loading="eager"
      :quality="55"
    />
    <div class="image-with-text__body">
      <h2 v-if="data.title" class="image-with-text__body-title h3">
        {{ data.title }}
      </h2>
      <StructuredText class="image-with-text__body-text" :data="data.body" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageTextBlockFragment } from "./ImageTextBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import { BackgroundColor } from "~/types/styling";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";

const props = defineProps<{
  data: FragmentOf<typeof ImageTextBlockFragment>;
}>();

const data = readFragment<typeof ImageTextBlockFragment>(props.data);
</script>

<style scoped>
.image-with-text {
  --image-with-text-body-background-color: var(--bg-pastel);

  width: 100%;
}

.image-with-text--pastel-background {
  --image-with-text-body-background-color: var(--white);
}

.image-with-text__image {
  height: auto;
}

.image-with-text__body {
  position: relative;
  z-index: var(--z-index-high);
  margin-top: calc(-1 * var(--spacing-bigger));
}

.image-with-text__body > * {
  padding-top: var(--spacing-medium);
  padding-right: var(--spacing-medium);
  padding-left: var(--spacing-medium);
}

.image-with-text__body-title {
  margin-left: var(--spacing-larger);
  background-color: var(--image-with-text-body-background-color);
}

.image-with-text--inverse .image-with-text__body-title {
  margin-left: 0;
  margin-right: var(--spacing-larger);
}

.image-with-text__body-text {
  padding-bottom: var(--spacing-medium);
  background-color: var(--image-with-text-body-background-color);
}

@media (min-width: 720px) {
  .image-with-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--spacing-larger) var(--spacing-larger) var(--spacing-larger) 0;
    background-image: linear-gradient(
      to right,
      transparent,
      transparent 25%,
      var(--image-with-text-body-background-color) 25%,
      var(--image-with-text-body-background-color) 100%
    );
  }

  .image-with-text--inverse {
    padding: var(--spacing-larger) 0 var(--spacing-larger) var(--spacing-larger);
    flex-direction: row-reverse;
    background-image: linear-gradient(
      to left,
      transparent,
      transparent 25%,
      var(--image-with-text-body-background-color) 25%,
      var(--image-with-text-body-background-color) 100%
    );
  }

  .image-with-text__image {
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

  .image-with-text__body > * {
    padding: 0;
  }

  .image-with-text__body-title,
  .image-with-text--inverse .image-with-text__body-title {
    margin-right: 0;
    margin-left: 0;
  }

  .image-with-text__body-text {
    margin-top: var(--spacing-small);
    padding-bottom: 0;
    background-color: transparent;
  }
}

@media (min-width: 1100px) {
  .image-with-text {
    padding: var(--spacing-big) var(--spacing-larger) var(--spacing-big) 0;
    background-image: linear-gradient(
      to right,
      transparent,
      transparent 30%,
      var(--image-with-text-body-background-color) 30%,
      var(--image-with-text-body-background-color) 100%
    );
  }

  .image-with-text--inverse {
    padding: var(--spacing-big) 0 var(--spacing-big) var(--spacing-larger);
    background-image: linear-gradient(
      to left,
      transparent,
      transparent 30%,
      var(--image-with-text-body-background-color) 30%,
      var(--image-with-text-body-background-color) 100%
    );
  }

  .image-with-text__image {
    width: 60%;
  }

  .image-with-text__body {
    width: 40%;
    margin-left: var(--spacing-big);
  }
}
</style>
