<template>
  <main class="page-faq grid">
    <page-header
      heading="byline"
      :byline="data.page.title"
      :headline="data.page.subtitle"
      :image="data.page.headerIllustration"
    />
    <section class="page-faq__overview">
      <ul>
        <li
          class="page-faq__overview-item"
          v-for="item in data.page.items"
          :key="item.title"
        >
          <generic-text-block
            :title="item.title"
            :body="item.body"
            :image="item.image"
          />
        </li>
      </ul>
      <scroll-to direction="up" />
    </section>
    <newsletter-form :has-background="true" />
  </main>
</template>

<script setup>
  import query from './index.query.graphql';

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
  .page-faq .page-header {
    grid-row: 1;
    margin-bottom: var(--spacing-large);
  }

  .page-faq__overview {
    grid-column: var(--grid-content);
    grid-row: 2;
  }

  .page-faq__overview-item {
    margin-bottom: var(--spacing-large);
  }

  .page-faq__overview .scroll-to {
    display: none;
    position: absolute;
    right: var(--spacing-larger);
    bottom: var(--spacing-big);
  }

  .page-faq .newsletter-form {
    grid-row: 3;
  }

  @media (min-width: 720px) {
    .page-faq .page-header {
      margin-bottom: var(--spacing-big);
    }

    .page-faq__overview {
      position: relative;
    }

    .page-faq__overview .scroll-to {
      display: flex;
    }
  }

  @media (min-width: 1100px) {
    .page-faq__overview {
      grid-column-end: 48;
      grid-column-start: 4;
    }
  }
</style>
