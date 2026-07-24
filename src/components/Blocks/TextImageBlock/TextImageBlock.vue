<template>
  <div
    v-if="isTextBackground"
    class="text-image-block text-image-block--text-background"
    :class="[
      `theme-card--${theme}`,
      { 'text-image-block--inverse': data.layout === 'text-image' },
    ]"
  >
    <DatoImage
      class="text-image-block__image"
      :src="data.image.url"
      :alt="data.image.alt || ''"
      :width="data.image.width!"
      :height="data.image.height!"
      sizes="(min-width: 1100px) 730px, (min-width: 720px) 40vw, 90vw"
      loading="eager"
      :quality="55"
    />
    <div class="text-image-block__body">
      <StructuredTextBlock
        class="text-image-block__body-text"
        :content="data.text"
        paragraph-variant="body-big"
      />
    </div>
  </div>
  <div
    v-else
    class="text-image-block text-image-block--default grid"
    :class="`theme-card--${theme}`"
  >
    <div :class="['layout', `layout--${data.layout}`]">
      <div class="layout__item">
        <StructuredTextBlock
          :content="data.text"
          paragraph-variant="body-big"
        />
      </div>
      <div class="layout__item">
        <DatoImage
          :src="data.image.url"
          :alt="data.image.alt || ''"
          :width="data.image.width!"
          :height="data.image.height!"
          class="layout__item--image"
          sizes="(min-width: 1100px) 730px, (min-width: 720px) 40vw, 90vw"
          loading="eager"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TextImageBlockFragment } from "./TextImageBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import {
  BackgroundColor,
  type BackgroundColorValue,
} from "~/types/styling";

const props = withDefaults(
  defineProps<{
    data: FragmentOf<typeof TextImageBlockFragment>;
    theme?: BackgroundColorValue | null;
  }>(),
  {
    theme: BackgroundColor.None,
  },
);

const data = readFragment<typeof TextImageBlockFragment>(props.data);

const theme = computed(() => props.theme ?? BackgroundColor.None);

const isTextBackground = computed(() => data.style === "text-background");
</script>

<style scoped>
.text-image-block--default .layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-medium);
  align-items: center;
  justify-content: center;
}

.text-image-block--default .layout__item--image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.text-image-block--default .layout__item {
  color: var(--html-blue);
}

@media (min-width: 800px) {
  .text-image-block--default .layout {
    gap: var(--spacing-big);
  }

  .text-image-block--default .layout--text-image {
    flex-direction: row;
  }

  .text-image-block--default .layout--image-text {
    flex-direction: row-reverse;
  }

  .text-image-block--default .layout__item {
    flex-grow: 1;
    flex-basis: 0%;
    width: 50%;
  }
}

.text-image-block--text-background {
  width: 100%;
}

.text-image-block--text-background .text-image-block__image {
  height: auto;
}

.text-image-block--text-background .text-image-block__body {
  position: relative;
  z-index: var(--z-index-high);
}

.text-image-block--text-background .text-image-block__body :deep(> *) {
  padding: var(--spacing-medium);
}

.text-image-block--text-background
  .text-image-block__body
  :deep(.structured-text__heading:first-child) {
  margin-left: var(--spacing-larger);
  background-color: var(--background-card);
}

.text-image-block--text-background.text-image-block--inverse
  .text-image-block__body
  :deep(.structured-text__heading:first-child) {
  margin-left: 0;
  margin-right: var(--spacing-larger);
}

.text-image-block--text-background .text-image-block__body-text {
  padding-bottom: var(--spacing-medium);
  background-color: var(--background-card);
}

.text-image-block--text-background {
  background-color: var(--background-card);
}

@media (min-width: 720px) {
  .text-image-block__body {
    margin-top: calc(-1 * var(--spacing-bigger));
  }
  .text-image-block--text-background {
    background-color: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--spacing-larger) var(--spacing-larger) var(--spacing-larger) 0;
  }

  .text-image-block--text-background.text-image-block--inverse {
    padding: var(--spacing-larger) 0 var(--spacing-larger) var(--spacing-larger);
    flex-direction: row-reverse;
    background-image: linear-gradient(
      to left,
      transparent,
      transparent 25%,
      var(--background-card) 25%,
      var(--background-card) 100%
    );
  }

  .text-image-block--text-background .text-image-block__image {
    width: 50%;
  }

  .text-image-block--text-background .text-image-block__body {
    width: 50%;
    margin-top: 0;
    margin-right: 0;
    margin-left: var(--spacing-large);
    padding: 0;
  }

  .text-image-block--text-background.text-image-block--inverse
    .text-image-block__body {
    margin-right: var(--spacing-large);
    margin-left: 0;
  }

  .text-image-block--text-background .text-image-block__body :deep(> *) {
    padding: 0;
  }

  .text-image-block--text-background
    .text-image-block__body
    :deep(.structured-text__heading:first-child),
  .text-image-block--text-background.text-image-block--inverse
    .text-image-block__body
    :deep(.structured-text__heading:first-child) {
    margin-right: 0;
    margin-left: 0;
  }

  .text-image-block--text-background .text-image-block__body-text {
    margin-top: var(--spacing-small);
    padding-bottom: 0;
    background-color: transparent;
  }
}

@media (min-width: 1100px) {
  .text-image-block--text-background {
    padding: var(--spacing-big) var(--spacing-larger) var(--spacing-big) 0;
    background-image: linear-gradient(
      to right,
      transparent,
      transparent 30%,
      var(--background-card) 30%,
      var(--background-card) 100%
    );
  }

  .text-image-block--text-background.text-image-block--inverse {
    padding: var(--spacing-big) 0 var(--spacing-big) var(--spacing-larger);
    background-image: linear-gradient(
      to left,
      transparent,
      transparent 30%,
      var(--background-card) 30%,
      var(--background-card) 100%
    );
  }

  .text-image-block--text-background .text-image-block__image {
    width: 60%;
  }

  .text-image-block--text-background .text-image-block__body {
    width: 40%;
    margin-left: var(--spacing-big);
  }

  .text-image-block--text-background.text-image-block--inverse
    .text-image-block__body {
    margin-left: 0;
    margin-right: var(--spacing-big);
  }
}
</style>
