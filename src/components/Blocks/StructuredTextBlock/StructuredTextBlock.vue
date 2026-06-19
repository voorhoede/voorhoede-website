<template>
  <structured-text-block
    :content="data.body"
    :grid-alignment="data.gridAlignment"
    :has-toc="data.hasToc"
    paragraph-variant="body-big"
  />
</template>

<script setup lang="ts">
import { type StructuredTextBlockFragment } from "./StructuredTextBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import StructuredTextBlock from "~/components/structured-text-block/structured-text-block.vue";

const props = defineProps<{
  data: FragmentOf<typeof StructuredTextBlockFragment>;
}>();

const data = readFragment<typeof StructuredTextBlockFragment>(props.data);
</script>

<style scoped>
/* Styles are handled by the structured-text-block component */
</style>
