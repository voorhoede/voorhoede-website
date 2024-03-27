<template>
  <NuxtLayout name="content-page">
    <main class="error-page">
      <page-header
        heading="byline"
        :byline="data.page.title"
        :headline="String(data.page.errorCode)"
        :image="data.page.headerImage"
      />
      <div class="error-page__backdrop grid">
        <div class="error-page__content body">
          {{ data.page.body }}
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup>
  const { $i18n } = useNuxtApp();
  import query from './error.query.graphql?raw';

  const { data } = await useFetchContent({
    key: 'ErrorPage',
    query,
    variables: {
      locale: $i18n.locale(),
    },
  });
</script>

<style>
  .error-page__backdrop {
    padding-bottom: var(--spacing-large);
    background-color: var(--white);
  }

  .error-page__content {
    padding: var(--spacing-large) 0;
    display: flex;
    flex-direction: column-reverse;
    background-color: var(--white);
  }

  @media screen and (min-width: 720px) {
    .error-page__backdrop {
      padding-bottom: var(--spacing-big);
      background-color: var(--bg-pastel);
    }

    .error-page__content {
      flex-direction: row;
      background-color: var(--white);
      padding: var(--spacing-large);
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 1100px) {
    .error-page__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger);
    }
  }
</style>
