<template>
  <section
    class="blogs-section grid"
    v-once
  >
    <h2 class="blogs-section__title h3">
      {{ data.title }}
    </h2>

    <BlogsList
      :items="data.items"
      :pinned-items="data.pinnedItems"
      :item-size="data.itemSize"
    />
  </section>
</template>

<script setup lang="ts">
import { type BlogsSectionFragment } from "./BlogsSection.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import BlogsList from "~/components/blogs-list/blogs-list.vue";

const props = defineProps<{
  data: FragmentOf<typeof BlogsSectionFragment>;
}>();

const data = readFragment<typeof BlogsSectionFragment>(props.data);
</script>

<style scoped>
.blogs-section__title {
  text-align: center;
  margin-bottom: var(--spacing-big);
}
</style>
