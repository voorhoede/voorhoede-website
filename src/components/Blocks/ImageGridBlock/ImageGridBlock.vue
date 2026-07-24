<template>
  <section
    v-if="isMosaic"
    class="image-card-grid-mosaic"
    :class="`theme-card--${theme}`"
  >
    <h2 v-if="data.title" class="image-card-grid-mosaic__title h2">
      {{ data.title }}
    </h2>
    <ul class="image-card-grid-mosaic__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="image-card-grid-mosaic__item"
        :class="{
          'image-card-grid-mosaic__item--full-width': item.isFullWidth,
        }"
      >
        <div
          class="image-card-grid-mosaic__cell image-card-grid-mosaic__cell--image"
        >
          <DatoImage
            v-if="item.image"
            class="image-card-grid-mosaic__cell-image"
            :src="item.image.url"
            :alt="item.image.alt || ''"
            :width="item.image.width!"
            :height="item.image.height!"
            :sizes="
              item.isFullWidth
                ? '(min-width: 1100px) 50vw, 100vw'
                : '(min-width: 1100px) 25vw, (min-width: 720px) 33vw, 50vw'
            "
            loading="eager"
          />
        </div>
        <div
          class="image-card-grid-mosaic__cell image-card-grid-mosaic__cell--content"
        >
          <h3 v-if="item.title" class="image-card-grid-mosaic__cell-title h3">
            {{ item.title }}
          </h3>
          <StructuredTextBlock
            v-if="item.body"
            paragraph-variant="body-small"
            :content="item.body"
          />
          <div v-if="item.cta" >
            <ActionBlock
              class="image-card-grid__link"
              :data="item.cta"
            />
          </div>
        </div>
      </li>
    </ul>
  </section>

  <section
    v-else
    class="image-card-grid"
    :class="[
      `theme-card--${theme}`,
      { 'image-card-grid--horizontal': data.cardOrientation === 'horizontal' },
    ]"
  >
    <h2 v-if="data.title" class="image-card-grid__title h2">
      {{ data.title }}
    </h2>
    <ul class="image-card-grid__list">
      <li v-for="item in items" :key="item.id" class="image-card-grid__card">
        <DatoImage
          class="image-card-grid__image"
          :src="item.image.url"
          :alt="item.image.alt || ''"
          :width="item.image.width!"
          :height="item.image.height!"
          :sizes="cardImageSizes"
          loading="eager"
        />
        <div class="image-card-grid__card-content">
          <h3 class="image-card-grid__card-title h3">
            {{ item.title }}
          </h3>

          <StructuredTextBlock
            v-if="item.body?.value"
            class="image-card-grid__body"
            :content="item.body"
          />

          <div v-if="item.cta" class="image-card-grid__link-container">
            <ActionBlock class="image-card-grid__link" :data="item.cta" />
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type {
  ImageGridBlockFragment,
  ImageGridItemFragment,
} from "./ImageGridBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import { BackgroundColor, type BackgroundColorValue } from "~/types/styling";
import ActionBlock from "~/components/Blocks/ActionBlock/ActionBlock.vue";

const props = withDefaults(
  defineProps<{
    data: FragmentOf<typeof ImageGridBlockFragment>;
    theme?: BackgroundColorValue | null;
  }>(),
  {
    theme: BackgroundColor.None,
  },
);

const data = readFragment<typeof ImageGridBlockFragment>(props.data);

const items = computed(() =>
  data.items.map((item) => readFragment<typeof ImageGridItemFragment>(item)),
);

const theme = computed(() => props.theme ?? BackgroundColor.None);

const isMosaic = computed(() => data.layout === "mosaic");

const cardImageSizes = computed(() =>
  data.cardOrientation === "horizontal"
    ? "(min-width: 1100px) 200px, 170px"
    : "170px",
);
</script>

<style scoped>
.image-card-grid-mosaic {
  display: inline-block;
  width: 100%;
  grid-column: var(--grid-page);
}

.image-card-grid-mosaic__title {
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.image-card-grid-mosaic__list {
  display: flex;
  flex-wrap: wrap;
}

/* Pair wrapper: 2 mosaic cells (image + text). */
.image-card-grid-mosaic__item {
  display: flex;
  flex: 0 0 100%;
  min-height: 250px;
}

/* Items 1–2: image→text (DOM order). Items 3–4: text→image. Repeat. */
.image-card-grid-mosaic__item:nth-child(4n + 3),
.image-card-grid-mosaic__item:nth-child(4n + 4) {
  flex-direction: row-reverse;
}

.image-card-grid-mosaic__item--full-width {
  flex: 0 0 100%;
}

.image-card-grid-mosaic__cell {
  flex: 0 0 50%;
  min-height: inherit;
  background-color: var(--bg-pastel);
}

/* Skip first item; then 2 highlighted, 2 not (items 2–3, 6–7, …). */
.image-card-grid-mosaic__item:nth-child(4n + 2) .image-card-grid-mosaic__cell,
.image-card-grid-mosaic__item:nth-child(4n + 3) .image-card-grid-mosaic__cell {
  background-color: var(--brand-yellow);
}

.theme-card--pastel-yellow
  .image-card-grid-mosaic__item:not(:nth-child(4n + 2)):not(:nth-child(4n + 3))
  .image-card-grid-mosaic__cell,
.theme-card--grey
  .image-card-grid-mosaic__item:not(:nth-child(4n + 2)):not(:nth-child(4n + 3))
  .image-card-grid-mosaic__cell {
  background-color: var(--background-card);
}

.image-card-grid-mosaic__cell-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.image-card-grid-mosaic__cell--content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-small);
}

.image-card-grid-mosaic__cell-title {
  margin-bottom: var(--spacing-smaller);
}

@media (min-width: 720px) {
  .image-card-grid-mosaic__item {
    height: 360px;
  }

  .image-card-grid-mosaic__item--full-width {
    order: 7;
    flex: 0 0 100%;
  }

  .image-card-grid-mosaic__cell--content {
    padding: var(--spacing-medium);
  }
}

@media (min-width: 1100px) {
  .image-card-grid-mosaic__item {
    flex: 0 0 50%;
  }

  .image-card-grid-mosaic__item--full-width {
    order: initial;
    flex: 0 0 100%;
  }

  .image-card-grid-mosaic__cell--content {
    padding: var(--spacing-large);
  }
}

.image-card-grid {
  --image-offset: 150px;
  --horizontal-image-width: 200px;
  grid-column: var(--grid-page);
}

.image-card-grid__title {
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.image-card-grid__card-title {
  margin-top: var(--spacing-smaller);
  margin-bottom: var(--spacing-smaller);
}

.image-card-grid__link-container {
  margin-top: auto;
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
  background: var(--background-card);
  margin-top: var(--image-offset);
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
  margin-top: var(--spacing-small);
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
