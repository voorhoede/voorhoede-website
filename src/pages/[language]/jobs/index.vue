<template>
  <main class="page-jobs">
    <page-header
      heading="byline"
      :byline="data.page.title"
      :headline="data.page.subtitle"
      :image="data.page.headerIllustration"
    />
    <div class="grid">
      <jobs-list
        v-if="data.items.length"
        :jobs="data.items"
      />
      <generic-text-block
        v-else
        class="page-jobs__empty-message"
        :body="data.page.noJobsAvailableMessage"
      />
    </div>
  </main>
</template>

<script setup>
  import query from './index.query.graphql?raw';

  const { params } = useRoute();

  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
    },
  });

  useSeoHead(data.value.page);
</script>

<style>
  .page-jobs__empty-message {
    margin-top: var(--spacing-large);
    margin-bottom: var(--spacing-big);
  }

  @media (min-width: 720px) {
    .page-jobs__empty-message {
      grid-column: var(--grid-content);
      margin-top: var(--spacing-big);
      margin-bottom: var(--spacing-bigger);
    }
  }

  @media (min-width: 1100px) {
    .page-jobs__empty-message {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }
</style>

