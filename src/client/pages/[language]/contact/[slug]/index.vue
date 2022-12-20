<template>
  <main>
    <section class="page-contact-confirmation">
      <page-header
        heading="byline"
        :byline="data.page.title"
        :headline="data.page.subtitle"
        :image="data.page.headerIllustration"
      />
      <div class="page-contact-confirmation__backdrop grid">
        <div class="page-contact-confirmation__content body">
          {{ data.page.body }}
        </div>
      </div>
    </section>
    <pivot-list
      v-if="data.page.pivots && data.page.pivots.length"
      :pivots="data.page.pivots"
      :last-item-has-background="false"
      :can-have-border-top="false"
    />
  </main>
</template>

<script setup>
  import query from './index.query.graphql?raw';

  const { params } = useRoute();
  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
      slug: params.slug,
    },
  });

  useSeoHead(data.value.page);
</script>

<style>
  .page-contact-confirmation {
    background-color: var(--bg-pastel);
  }

  .page-contact-confirmation__backdrop {
    margin-bottom: var(--spacing-large);
    background-color: var(--white);
  }

  .page-contact-confirmation__content {
    padding: var(--spacing-large) 0;
    display: flex;
    flex-direction: column-reverse;
    background-color: var(--white);
  }

  @media screen and (min-width: 720px) {
    .page-contact-confirmation__backdrop {
      margin-bottom: var(--spacing-big);
      background-color: var(--bg-pastel);
    }

    .page-contact-confirmation__content {
      flex-direction: row;
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-large);
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-contact-confirmation__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger) var(--spacing-larger);
    }
  }
</style>
