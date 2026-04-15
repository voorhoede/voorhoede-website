<template>
  <div 
  v-for="item in items" 
  :key="item.id"
  :class="[`grouping-block`, 
    `grid`,
    `background--${props.theme}`,
    `accent--${props.accentPosition}`]"
>
    <div v-for="section in item.sections" :key="section.id" class="grouping-item">
      <text-image-block
        v-if="section.__typename === 'SectionTextImageRecord'"
        class=""
        :text="section.text"
        :layout="section.layout"
        :image="section.image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CdaStructuredTextValue } from "datocms-structured-text-utils";

interface Section {
  id: string;
  __typename: string;
  text: CdaStructuredTextValue;
  layout: "text-image" | "image-text";
  image: object;
}

interface GroupItem {
  id: string;
  sections: Section[];
}

const props = defineProps<{
  items: GroupItem[];
  theme?: 'none' | 'gray' | 'yellow';
  accentPosition?: 'none' | 'left' | 'right';
}>();
</script>

<style>
.grouping-block {
  padding: var(--spacing-big) 0;
  display: grid;
  row-gap: var(--spacing-larger);
  position: relative;
  overflow: hidden;
  --grouping-accent-color: var(--brand-yellow);
  --grouping-accent-width: max(50%, 440px);
}

.grouping-item {
  z-index: 1;
}

.background--gray {
    background-color: var(--fog);
}

.background--yellow {
  background-color: var(--bg-pastel);
}

.grouping-block.accent--left::before,
.grouping-block.accent--right::before {
  background-color: var(--grouping-accent-color);
  bottom: 0;
  content: "";
  height: calc(100% - var(--spacing-huge));
  position: absolute;
  width: var(--grouping-accent-width);
  z-index: 0;
}

.grouping-block.accent--left::before {
  left: 0;
}

.grouping-block.accent--right::before {
  right: 0;
}

@media (max-width: 800px) {
  .grouping-block {
    --grouping-accent-width: 100%;
  }

  .grouping-block.accent--left::before,
  .grouping-block.accent--right::before {
    bottom: auto;
    left: 50%;
    right: auto;
    top: 60%;
    transform: translate(-50%, -50%);
    width: var(--grouping-accent-width);;
    height: clamp(50%, 60dvh, 100%);
  }
}
</style>
