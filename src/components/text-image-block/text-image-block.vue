<template>
  <div class="component">
    <div :class="[`layout`, `layout--${props.layout}`]">
      <div class="layout__item">
        <structured-text-block :content="props.text" />
      </div>
      <div class="layout__item">
        <dato-image
          :src="image.url"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
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

@container component (min-width: 760px) {
  .layout {
    display: flex;
    align-items: center;
  }
  .layout--text-image {
    flex-direction: row;
  }
  .layout--image-text {
    flex-direction: row-reverse;
  }
  .layout__item {
    flex: 1;
    width: 50%;
  }
}
</style>
