<template>
  <div
    v-for="item in items"
    :key="item.id"
    :class="[
      'grouping-block',
      'grid',
      `grouping-block--${data.theme}`,
      {
        'grouping-block--with-accent': data.accentPosition !== 'none',
        'grouping-block--with-theme': data.theme !== 'none',
      },
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
              section.__typename === 'TextImageBlockRecord',
          },
        ]"
      >
        <BlockItem :block="section" :theme="data.theme" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  GroupingBlockFragment,
  GroupingItemFragment,
} from "./GroupingBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { BlockRecord } from "../types";
import BlockItem from "../BlockItem.vue";

const props = defineProps<{
  data: FragmentOf<typeof GroupingBlockFragment>;
}>();

const data = readFragment<typeof GroupingBlockFragment>(props.data);

const items = computed(() =>
  data?.items.map((item) => {
    const { id, sections } = readFragment<typeof GroupingItemFragment>(item);
    return { id, sections: (sections ?? []) as BlockRecord[] };
  }),
);
</script>

<style scoped>
.grouping-block {
  grid-column: var(--grid-page);
  padding-block-start: var(--spacing-larger);

  &.grouping-block--with-theme {
    padding-block-end: var(--spacing-larger);
  }

  &.grouping-block--grey {
    background-color: var(--fog);
  }

  &.grouping-block--pastel-yellow {
    background-color: var(--bg-pastel);
  }
}

.grouping-block-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-larger);
  position: relative;
}

.grouping-block-item {
  position: relative;
}

.grouping-block--with-accent {
  background-image: linear-gradient(var(--white), var(--white));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 100% var(--spacing-huge);

  & .grouping-block-wrapper {
    --grouping-accent-color: var(--brand-yellow);
    --grouping-accent-width: 100%;
    position: relative;
  }

  & .grouping-block-wrapper::before {
    content: "";
    position: absolute;
    width: var(--grouping-accent-width);
    height: clamp(50%, 60dvh, 100%);
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--grouping-accent-color);
  }

  @media (min-width: 800px) {
    & .grouping-block-wrapper {
      --grouping-accent-width: max(50%, 27.5rem);
      padding-block-end: var(--spacing-larger);
    }

    & .grouping-block-wrapper::before {
      height: calc(100% - var(--spacing-huge));
      transform: none;
      top: auto;
      bottom: 0;
    }

    & .accent--left::before {
      left: 0;
    }

    & .accent--right::before {
      right: 0;
    }
  }
}

@media (min-width: 1400px) {
  .grouping-block--with-accent .grouping-block-item--text-image :deep(.grid) {
    margin-inline: var(--spacing-larger);
    grid-template-columns: none;
  }
}
</style>
