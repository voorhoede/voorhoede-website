<template>
  <ul class="jobs-list grid">
    <li
      class="jobs-list__item"
      v-for="item in data.jobs.filter((job) => !job.isClosed)"
      :key="item.slug"
    >
      <JobsExcerpt
        class="jobs-list__excerpt"
        :is-nested="true"
        :title="item.title"
        :image="item.jobImage"
        :slug="item.slug"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import JobsExcerpt from "~/components/jobs-excerpt/jobs-excerpt.vue";
import type { JobsListBlockFragment } from "./JobsListBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof JobsListBlockFragment>;
}>();

const data = readFragment<typeof JobsListBlockFragment>(props.data);
</script>

<style scoped>
.jobs-list {
  grid-column-start: 1;
  grid-column-end: 51;
  background-color: var(--white);
}

.jobs-list__item {
  grid-column: var(--grid-content);
}

@media (min-width: 1100px) {
  .jobs-list__item {
    grid-column: var(--grid-content-narrow);
  }
}
</style>
