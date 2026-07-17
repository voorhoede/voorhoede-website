<template>
  <section
    class="image-card-grid"
    :class="{
      'image-card-grid--horizontal': data.cardOrientation === 'horizontal',
      'image-card-grid--pastel-background':
        data.backgroundColor === BackgroundColor.PastelYellow,
    }"
  >
    <h2 class="image-card-grid__title h2">
      {{ data.title }}
    </h2>
    <ul class="image-card-grid__list">
      <li
        v-for="card in data.items"
        :key="card.id"
        class="image-card-grid__card"
      >
        <DatoImage
          class="image-card-grid__image"
          :src="card.image.url"
          alt=""
          :width="card.image.width!"
          :height="card.image.height!"
          :sizes="imageSizes"
          loading="eager"
        />
        <div class="image-card-grid__card-content">
          <h3 class="h3">
            {{ card.title }}
          </h3>

          <StructuredTextBlock
            class="image-card-grid__body"
            :content="card.body"
          />

          <AppLink
            v-if="card.links[0]"
            class="image-card-grid__link"
            :link="card.links[0]"
          />
        </div>
      </li>
    </ul>
    <div class="image-card-grid__text" v-if="data.text">
      <StructuredTextBlock :content="data.text" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImageCardGridBlockFragment } from "./ImageCardGridBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import { BackgroundColor } from "~/types/styling";
import AppLink from "~/components/Core/AppLink/AppLink.vue";
import DatoImage from "~/components/dato-image/dato-image.vue";
import StructuredTextBlock from "~/components/structured-text-block/structured-text-block.vue";

const props = defineProps<{
  data: FragmentOf<typeof ImageCardGridBlockFragment>;
}>();

const data = readFragment<typeof ImageCardGridBlockFragment>(props.data);

const imageSizes = computed(() => {
  return data.cardOrientation === "horizontal"
    ? "(min-width: 1100px) 200px, 170px"
    : "170px";
});
</script>

<style scoped>
.image-card-grid {
  --image-offset: 150px;
  --horizontal-image-width: 200px;
}

.image-card-grid__title {
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.image-card-grid__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-large);
}

.image-card-grid__card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-basis: 20rem;
  padding: var(--spacing-medium);
  background: var(--bg-pastel);
  margin-top: var(--image-offset);
}

.image-card-grid--pastel-background .image-card-grid__card {
  background-color: var(--white);
}

.image-card-grid__image {
  margin-top: calc(-1 * var(--image-offset));
  align-self: center;
  width: 170px;
  height: 170px;
}

.image-card-grid__card-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.image-card-grid__body {
  margin-top: var(--spacing-smaller);
  margin-bottom: var(--spacing-small);
}

:deep(.image-card-grid__link) {
  margin-top: auto;
  align-self: flex-start;
}

:deep(.image-card-grid__link)::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.image-card-grid__text {
  margin-top: var(--spacing-larger);
  margin-inline: auto;
  text-align: center;
}

@media (min-width: 720px) {
  .image-card-grid--horizontal .image-card-grid__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .image-card-grid--horizontal .image-card-grid__list {
    column-gap: var(--spacing-small);
  }

  .image-card-grid--horizontal .image-card-grid__card {
    margin-top: 0;
    margin-left: calc(var(--horizontal-image-width) / 2);
    padding-left: 0;
    flex-direction: row;
  }

  .image-card-grid--horizontal .image-card-grid__image {
    margin-top: 0;
    margin-left: calc(var(--horizontal-image-width) / -2);
    margin-right: var(--spacing-small);
    width: var(--horizontal-image-width);
    height: auto;
    flex-shrink: 0;
  }

  .image-card-grid--horizontal .image-card-grid__card-content {
    width: calc(100% - var(--horizontal-image-width));
  }
}

@media (min-width: 1440px) {
  .image-card-grid--horizontal .image-card-grid__list {
    column-gap: var(--spacing-large);
  }

  .image-card-grid--horizontal .image-card-grid__image {
    margin-right: var(--spacing-large);
  }
}
</style>
