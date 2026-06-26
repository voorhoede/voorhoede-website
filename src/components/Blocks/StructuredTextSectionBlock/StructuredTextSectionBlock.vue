<template>
  <StructuredText
    :data="data.body"
    :class="[
      'structured-text-section',
      'body-big',
      { 'structured-text-section--center': data.gridAlignment === 'center' },
    ]"
  />
</template>

<script setup lang="ts">
import type { StructuredTextSectionBlockFragment } from "./StructuredTextSectionBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";

const props = defineProps<{
  data: FragmentOf<typeof StructuredTextSectionBlockFragment>;
}>();

const data = readFragment<typeof StructuredTextSectionBlockFragment>(props.data);
</script>

<style scoped>
.structured-text-section {
  grid-column: var(--grid-content);
  word-wrap: break-word;
}

@media (min-width: 720px) {
  .structured-text-section--center {
    grid-column-start: 6;
    grid-column-end: 44;
  }
}

@media (min-width: 1100px) {
  .structured-text-section--center {
    grid-column-start: 10;
    grid-column-end: 42;
  }
}
</style>
