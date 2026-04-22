<template>
  <div class="component grid">
    <div :class="[`layout`, `layout--${props.layout}`]">
      <div class="layout__item">
        <structured-text-block :content="props.text" :paragraph-variant="'body-big'"/>
      </div>
      <div class="layout__item">
        <dato-image
          :src="image.url"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          class="layout__item--image"
          loading="eager"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CdaStructuredTextValue } from "datocms-structured-text-utils";

const props = defineProps<{
  layout: "text-image" | "image-text";
  text: CdaStructuredTextValue;
  image: object;
}>();
</script>

<style scoped>
.component {
  container-type: inline-size;
  container-name: component;
}

.layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-big);
  align-items: center;
  justify-content: center;
}

.layout__item--image{
  width: 100%;
}

@container component (min-width: 760px) {

  .layout--text-image {
    flex-direction: row;
  }
  .layout--image-text {
    flex-direction: row-reverse;
  }
  .layout__item {
    flex: 1;
    width: 50%;
    color: var(--html-blue);
  }
}
</style>
