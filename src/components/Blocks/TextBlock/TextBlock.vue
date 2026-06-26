<template>
  <div
    :class="{
      [`text-block`]: true,
      [`text-block--style-${data.style}`]: true,
      [`text-block--layout-${data.layout}`]: true,
      'body-big': data.style === 'default',
      testimonial: data.style === 'highlight',
    }"
  >
    <StructuredText :data="data.text" />
  </div>
</template>

<script setup lang="ts">
import { type TextBlockFragment } from "./TextBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";

const props = defineProps<{
  data: FragmentOf<typeof TextBlockFragment>;
}>();

const data = readFragment<typeof TextBlockFragment>(props.data);
</script>

<style scoped>
.text-block--layout-centered {
  justify-self: center;
  text-align: center;
  max-width: 40rem;
}

.text-block--style-highlight {
  padding-block: var(--spacing-large);
}
</style>
