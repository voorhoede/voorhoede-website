<template>
  <div class="grid" v-once>
    <div :class="[`layout`, `layout--${data.layout}`]">
      <div class="layout__item">
        <StructuredTextBlock
          :content="data.text"
          paragraph-variant="body-big"
        />
      </div>
      <div class="layout__item">
        <DatoImage
          :src="data.image.url"
          :alt="data.image.alt || ''"
          :width="data.image.width!"
          :height="data.image.height!"
          class="layout__item--image"
          loading="eager"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TextImageBlockFragment } from "./TextImageBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof TextImageBlockFragment>;
}>();

const data = readFragment<typeof TextImageBlockFragment>(props.data);
</script>

<style scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-medium);
  align-items: center;
  justify-content: center;
}

.layout__item--image {
  width: 100%;
}

.layout__item {
  color: var(--html-blue);
}

@media (min-width: 800px) {
  .layout {
    gap: var(--spacing-big);
  }

  .layout--text-image {
    flex-direction: row;
  }

  .layout--image-text {
    flex-direction: row-reverse;
  }

  .layout__item {
    flex-grow: 1;
    flex-basis: 0%;
    width: 50%;
  }
}
</style>
