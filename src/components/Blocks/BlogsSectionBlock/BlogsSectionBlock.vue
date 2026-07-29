<template>
  <section class="blogs-section grid" v-once>
    <h2 class="blogs-section__title h3">
      {{ data.title }}
    </h2>

    <div
      v-if="structuredDescription"
      class="blogs-section__description body"
    >
      <StructuredText :data="structuredDescription" />
    </div>

    <BlogsList
      :items="data.items"
      :pinned-items="data.pinnedItems"
      :item-size="data.itemSize"
    />
  </section>
</template>

<script setup lang="ts">
import type { BlogsSectionBlockFragment } from "./BlogsSectionBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { CdaStructuredTextValue } from "datocms-structured-text-utils";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";

const props = defineProps<{
  data: FragmentOf<typeof BlogsSectionBlockFragment>;
}>();

const data = readFragment<typeof BlogsSectionBlockFragment>(props.data);

const structuredDescription = computed(() =>
  data.description
    ? (data.description as unknown as CdaStructuredTextValue)
    : null,
);
</script>

<style scoped>
.blogs-section__title {
  text-align: center;
  margin-bottom: var(--spacing-big);
}

.blogs-section__description {
  text-align: center;
  margin-block: calc(-1 * var(--spacing-medium)) var(--spacing-big);
  margin-inline: auto;
  max-width: 40rem;
}
</style>
