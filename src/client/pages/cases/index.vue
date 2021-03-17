<template>
  <div>
    <main class="page-cases">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      />
      <introduction-block
        v-if="page.introductionBlock"
        :title="page.introductionBlock.title"
        :body="page.introductionBlock.body"
        class="page-cases__introduction grid"
      />
      <section class="grid">
        <h2 class="sr-only">{{ $t('all_cases') }}</h2>
        <ul class="page-case__overview">
          <li class="page-case__overview-item" v-for="caseItem in items" :key="caseItem.slug">
            <case-excerpt
              :slug="caseItem.slug"
              :image="caseItem.caseTeaser.image"
              :title="caseItem.title"
              :body="caseItem.subtitle"
            />
          </li>
        </ul>
      </section>
      <pivot-list
        class="page-cases__pivots"
        v-if="page.pivots && page.pivots.length"
        :pivots="page.pivots"
      />
    </main>
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  export default {
    asyncData,
    head,
  }
</script>

<style>
  .page-cases__introduction {
    margin-top: var(--spacing-larger);
  }

  @media (min-width: 720px) {
    .page-cases__introduction > * {
      grid-column-start: 8;
      grid-column-end: 44;
      text-align: center;
    }
  }

  .page-cases__pivots .newsletter-form {
    background-color: var(--bg-pastel);
  }

  .page-case__overview {
    display: flex;
    flex-direction: column;
    margin: var(--spacing-large) 0 0 0;
  }

  .page-case__overview-item {
    width: 100%;
    margin-bottom: var(--spacing-big);
  }

  .page-case__overview-item .case-excerpt {
    height: 100%;
  }

  @media (min-width: 540px) {
    .page-case__overview {
      flex-flow: row wrap;
    }

    .page-case__overview-item {
      width: calc(50% - (var(--spacing-smaller) * 2));
      margin-left: var(--spacing-smaller);
      margin-right: var(--spacing-smaller);
      margin-bottom: var(--spacing-larger);
    }
  }

  @media (min-width: 720px) {
    .page-case__overview {
      margin: var(--spacing-larger) 0;
    }
  }

  @media (min-width: 1200px) {
    .page-case__overview-item {
      width: calc(33% - (var(--spacing-medium) * 2));
      margin-bottom: var(--spacing-larger);
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }
  }
</style>
