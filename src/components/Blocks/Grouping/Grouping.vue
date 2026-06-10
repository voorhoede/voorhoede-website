<template>
  <div
    v-for="item in items"
    :key="item.id"
    :class="[
      'grouping-block',
      'grid',
      `background--${data.theme}`,
      { 'grouping-block--with-accent': data.accentPosition !== 'none' },
    ]"
  >
    <div :class="['grouping-block-wrapper', `accent--${data.accentPosition}`]">
      <div
        v-for="(section, index) in item.sections"
        :key="index"
        :class="[
          'grouping-block-item',
          {
            'grouping-block-item--text-image':
              section.__typename === 'SectionTextImageRecord',
          },
        ]"
      >
        <BlockItem :block="section" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type GroupingFragment, type GroupingItemFragment } from "./Grouping.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { BlockRecord } from "../types";
import BlockItem from "../BlockItem.vue";

const props = defineProps<{
  data: FragmentOf<typeof GroupingFragment>;
}>();

const data = readFragment<typeof GroupingFragment>(props.data);

type GroupingSection = Extract<
  BlockRecord,
  { __typename: "SectionLogoGridRecord" | "SectionTextImageRecord" }
>;

const items = computed(() =>
  (data?.items ?? []).map((item) => {
    const { id, sections } = readFragment<typeof GroupingItemFragment>(item);
    return { id, sections: (sections ?? []) as GroupingSection[] };
  }),
);
</script>

<style scoped>
.grouping-block {
  display: grid;
  /* Span the full page columns (incl. edge margins) so the background bleeds
     to the viewport edges like the page header. Inner content stays inset
     because `.grouping-block` is itself a `.grid` (`.grid > *` → content). */
  grid-column: var(--grid-page);
  row-gap: var(--spacing-larger);
  position: relative;
  overflow: hidden;
  padding-top: var(--spacing-big);
}

.grouping-block--with-accent {
  background-image: linear-gradient(var(--white), var(--white));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 100% var(--spacing-huge);
}

.grouping-block-wrapper {
  position: relative;
  --grouping-accent-color: var(--brand-yellow);
  --grouping-accent-width: 100%;
}

.grouping-block-item {
  position: relative;
  z-index: 1;
}

/* Mirror the legacy `.grouping-block-item-content` styling that production
   applied to a text-image inside a grouping. Sections now render through the
   shared `BlockItem` dispatcher, so we can't set a class on the inner
   component — instead target its root (`.grid`) from the wrapper. */
.grouping-block-item--text-image :deep(.grid) {
  padding-block-end: var(--spacing-larger);
}

@media (min-width: 1400px) {
  .grouping-block-item--text-image :deep(.grid) {
    margin-inline: var(--spacing-larger);
    grid-template-columns: none;
  }
}

.background--grey {
  margin-top: var(--spacing-huge);
  padding-block-end: var(--spacing-medium);
  background-color: var(--fog);
}

.background--pastel-yellow,
.background--yellow {
  background-color: var(--bg-pastel);
}

.grouping-block-wrapper.accent--left::before,
.grouping-block-wrapper.accent--right::before {
  background-color: var(--grouping-accent-color);
  bottom: auto;
  content: "";
  height: clamp(50%, 60dvh, 100%);
  left: 50%;
  position: absolute;
  right: auto;
  top: 60%;
  transform: translate(-50%, -50%);
  width: var(--grouping-accent-width);
  z-index: 0;
}

.grouping-block-wrapper.accent--left::before {
  left: 50%;
}

.grouping-block-wrapper.accent--right::before {
  right: auto;
}

@media (min-width: 800px) {
  .grouping-block-wrapper {
    --grouping-accent-width: max(50%, 440px);
  }

  .grouping-block-wrapper.accent--left::before,
  .grouping-block-wrapper.accent--right::before {
    bottom: 0;
    height: calc(100% - var(--spacing-huge));
    left: 0;
    right: 0;
    top: auto;
    transform: none;
  }

  .grouping-block-wrapper.accent--left::before {
    left: 0;
  }

  .grouping-block-wrapper.accent--right::before {
    right: 0;
    left: auto;
  }
}
</style>
