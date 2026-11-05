<template>
  <div
    v-if="blocks.length"
    class="page-partial-block"
    :class="{
      'page-partial-block--full-width': isFullWidth && hasBackground,
      'page-partial-block--grey':
        isFullWidth && theme === BackgroundColor.Grey,
      'page-partial-block--pastel':
        isFullWidth && theme === BackgroundColor.PastelYellow,
    }"
  >
    <Blocks :blocks="blocks" :host-page-id="props.hostPageId" />
  </div>
</template>

<script setup lang="ts">
import type { PagePartialBlockFragment } from "./PagePartialBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { BlockRecord } from "../types";
import {
  BackgroundColor,
  type BackgroundColorValue,
} from "~/types/styling";
import Blocks from "../Blocks.vue";

const props = defineProps<{
  data: FragmentOf<typeof PagePartialBlockFragment>;
  hostPageId?: string | null;
}>();

const data = readFragment<typeof PagePartialBlockFragment>(props.data);

const theme = computed(
  () => (data.theme as BackgroundColorValue) ?? BackgroundColor.None,
);
const isFullWidth = computed(() => data.layout === "full_width");
const hasBackground = computed(
  () =>
    theme.value === BackgroundColor.Grey ||
    theme.value === BackgroundColor.PastelYellow,
);

type SupportedBlockItem = Exclude<
  BlockRecord,
  { __typename: "PagePartialBlockRecord" }
> & { backgroundColor?: BackgroundColorValue | null };

const blocks = computed(() => {
  const items = (data.item?.blocks ?? []) as SupportedBlockItem[];

  if (isFullWidth.value && hasBackground.value) {
    return items;
  }

  return items.map((block) => ({
    ...block,
    backgroundColor: theme.value,
  }));
});
</script>

<style scoped>
.page-partial-block--full-width {
  grid-column: var(--grid-page);
  padding-block: var(--spacing-huge);
}

.page-partial-block--grey {
  background-color: var(--fog);
}

.page-partial-block--pastel {
  background-color: var(--bg-pastel);
}
</style>
