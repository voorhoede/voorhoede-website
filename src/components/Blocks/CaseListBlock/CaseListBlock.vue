<template>
  <h2 class="cases-list__title h1" v-if="data.title">
    {{ data.title }}
  </h2>
  <ul class="cases-list" :style="{ '--max-columns': data.columns }">
    <li v-for="caseItem in data.cases" :key="caseItem.slug">
      <LinkCard
        :internal-link="
          $localeUrl({ name: 'cases-slug', params: { slug: caseItem.slug } })
        "
        :image="caseItem.caseTeaser.image"
        :title="caseItem.title"
        :body="caseItem.caseTeaser.title"
        :sizes="sizes"
      />
    </li>
  </ul>
  <div class="cases-list__text" v-if="data.text">
    <StructuredText :data="data.text" />
  </div>
</template>

<script setup lang="ts">
import type { CaseListBlockFragment } from "./CaseListBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";
import LinkCard from "~/components/link-card/link-card.vue";

const props = defineProps<{
  data: FragmentOf<typeof CaseListBlockFragment>;
}>();

const data = readFragment<typeof CaseListBlockFragment>(props.data);

const sizes = computed(() => {
  const columnWidth = Math.round(1200 / data.columns);
  const vwWidth = Math.round(100 / Math.max(1, data.columns - 1));

  return `(min-width: 1200px) ${columnWidth}px, (min-width: 800px) ${vwWidth}vw, 90vw`;
});
</script>

<style scoped>
.cases-list {
  --grid-gap: var(--spacing-medium);
  --grid-item--min-width: 16rem;

  --gap-count: calc(var(--max-columns) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-gap));
  --grid-item--max-width: calc(
    (100% - var(--total-gap-width)) / var(--max-columns)
  );

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
  );
  grid-gap: var(--grid-gap);
}

.cases-list__title {
  margin-bottom: var(--spacing-larger);
  text-align: center;
}

.cases-list .link-card {
  height: 100%;
}

.cases-list__text {
  margin-top: var(--spacing-medium);
  margin-inline: auto;
  text-align: center;
}
</style>
