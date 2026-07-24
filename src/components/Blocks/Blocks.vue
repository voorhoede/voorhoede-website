<script setup lang="ts">
import type { BlockRecord } from "./types";
import { BackgroundColor, type BackgroundColorValue } from "~/types/styling";
import BlockItem from "./BlockItem.vue";

const props = defineProps<{
  blocks: (BlockRecord & { backgroundColor?: BackgroundColorValue | null })[];
}>();
</script>

<template>
  <div
    v-for="(block, index) in props.blocks"
    :key="index"
    class="grid block"
    :class="{
      'block--background':
        block.backgroundColor === BackgroundColor.PastelYellow ||
        block.backgroundColor === BackgroundColor.Grey,
      'block--pastel-background':
        block.backgroundColor === BackgroundColor.PastelYellow,
      'block--grey-background': block.backgroundColor === BackgroundColor.Grey,
    }"
  >
    <BlockItem
      :block="block"
      :theme="block.backgroundColor ?? BackgroundColor.None"
    />
  </div>
</template>

<style scoped>
.block:not(:has(.page-header)) {
  margin-bottom: var(--spacing-larger);

  @media (min-width: 720px) {
    margin-bottom: var(--spacing-huge);
  }
}

.block--background {
  padding-block: var(--spacing-huge);
}

.block--pastel-background {
  background-color: var(--bg-pastel);
}

.block--grey-background {
  background-color: var(--fog);
}
</style>
