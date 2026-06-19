<script setup lang="ts">
import type { BlockRecord } from "./types";
import BlockItem from "./BlockItem.vue";
import { BackgroundColor } from "~/types";

const props = defineProps<{
  blocks: BlockRecord[];
}>();

function getSectionBackgroundColor(block: BlockRecord): BackgroundColor {
  switch (block.__typename) {
    case 'SectionHeaderRecord': {
      return BackgroundColor.PastelYellow;
    }
    case 'SectionLogoGridRecord': {
      return BackgroundColor.Grey;
    }
    default: {
      return (block as any).backgroundColor || BackgroundColor.None;
    }
  }
}
</script>

<template>
  <div
    v-for="(block, index) in props.blocks"
    :key="index"
    class="grid landing-page__section block"
    :class="{
      'landing-page__section--background': getSectionBackgroundColor(block) !== BackgroundColor.None,
      'landing-page__section--pastel-background': getSectionBackgroundColor(block) === BackgroundColor.PastelYellow,
      'landing-page__section--grey-background': getSectionBackgroundColor(block) === BackgroundColor.Grey,
    }"
  >
    <BlockItem :block="block" />
  </div>
</template>

<style scoped>
.landing-page__section + .landing-page__section:not(:has(.grouping-block)) {
  padding-top: var(--spacing-huge);
}

.landing-page__section--background,
.landing-page__section:last-child {
  padding-bottom: var(--spacing-huge);
}

.landing-page__section--pastel-background {
  background-color: var(--bg-pastel);
}

.landing-page__section--grey-background {
  background-color: var(--fog);
}

.landing-page__section:not(.landing-page__section--background) + .landing-page__section--background {
  margin-top: var(--spacing-big);
}

.landing-page__section--pastel-background + .landing-page__section--pastel-background:not(:has(.grouping-block)),
.landing-page__section--grey-background + .landing-page__section--grey-background:not(:has(.grouping-block)) {
  padding-top: var(--spacing-large);
}

.landing-page__section--pastel-background:has(+ .landing-page__section--pastel-background),
.landing-page__section--grey-background:has(+ .landing-page__section--grey-background) {
  padding-bottom: var(--spacing-large);
}
</style>
