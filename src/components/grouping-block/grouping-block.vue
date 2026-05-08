<template>
  <div
    v-for="item in props.items"
    :key="item.id"
    :class="[
      'grouping-block',
      'grid',
      `background--${props.theme}`,
      { 'grouping-block--with-accent': props.accentPosition !== 'none' },
    ]"
  >
    <div :class="['grouping-block-wrapper', `accent--${props.accentPosition}`]">
      <div
        v-for="section in item.sections"
        :key="section.id"
        class="grouping-block-item"
      >
        <text-image-block
          v-if="section.__typename === 'SectionTextImageRecord'"
          class="grouping-block-item-content"
          :text="section.text"
          :layout="section.layout"
          :image="section.image"
        />
        <logo-grid
          v-if="section.__typename === 'SectionLogoGridRecord'"
          :title="section.title"
          :logos="section.logos"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BackgroundColor, type BackgroundColorValue } from "~/types/styling";

interface Section {
  id: string;
  __typename: string;
  [key: string]: any;
}

interface GroupItem {
  id: string;
  sections: Section[];
}

const props = withDefaults(
  defineProps<{
    items: GroupItem[];
    theme?: BackgroundColorValue;
    accentPosition?: "none" | "left" | "right";
  }>(),
  {
    theme: BackgroundColor.None,
    accentPosition: "none",
  },
);
</script>

<style scoped>
.grouping-block {
  display: grid;
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

.grouping-block-item-content {
  padding-block-end: var(--spacing-larger);
}
.background--grey {
  margin-top: var(--spacing-huge);
  padding-block-end: var(--spacing-medium);
}

.background--grey {
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

@media (min-width: 1400px) {
  .grouping-block-item-content {
    margin-inline: var(--spacing-larger);
    grid-template-columns: none;
  }
}
</style>
