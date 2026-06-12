<script setup lang="ts">
import type { BlockRecord } from "./types";
import BlockItem from "./BlockItem.vue";

const props = defineProps<{
  blocks: BlockRecord[];
}>();
</script>

<template>
  <div v-for="(block, index) in props.blocks" :key="index" class="grid block">
    <BlockItem :block="block" />
  </div>
</template>

<style scoped>
.block:not(:has(.page-header)) {
  margin-bottom: var(--spacing-larger);

  @media (min-width: 720px) {
    margin-bottom: var(--spacing-huge);
  }
}
</style>
