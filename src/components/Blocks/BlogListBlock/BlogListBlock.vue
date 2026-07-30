<template>
  <section class="blog-list-block grid" v-once>
    <h2 class="blog-list-block__title h3">
      {{ data.title }}
    </h2>

    <div
      v-if="structuredDescription"
      class="blog-list-block__description body"
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
import type { BlogListBlockFragment } from "./BlogListBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { CdaStructuredTextValue } from "datocms-structured-text-utils";
import BlogsList from "~/components/blogs-list/blogs-list.vue";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";

const props = defineProps<{
  data: FragmentOf<typeof BlogListBlockFragment>;
}>();

const data = readFragment<typeof BlogListBlockFragment>(props.data);

const structuredDescription = computed(() =>
  data.description
    ? (data.description as unknown as CdaStructuredTextValue)
    : null,
);
</script>

<style scoped>
.blog-list-block__title {
  text-align: center;
  margin-bottom: var(--spacing-big);
}

.blog-list-block__description {
  text-align: center;
  margin-block: calc(-1 * var(--spacing-medium)) var(--spacing-big);
  margin-inline: auto;
  max-width: 40rem;
}
</style>
