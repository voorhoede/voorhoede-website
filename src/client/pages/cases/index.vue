<template>
  <main class="page-cases">
    <page-header
      :context="page.title"
      :tagline="page.subtitle"
      heading="context"
      :image="page.headerIllustration"
    />
    <div class="grid">
      <ul class="page-case__overview">
        <li class="page-case__overview-item" v-for="caseItem in items" :key="caseItem.slug">
          <case-excerpt
            :slug="caseItem.slug"
            :image="caseItem.heroIllustration"
            :title="caseItem.title"
            :body="caseItem.subtitle"
          />
        </li>
      </ul>
    </div>
    <div class="grid">
      <pivot-section
        v-if="pivots && pivots.length"
        :pivot="pivots[0]"
      />
    </div>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import { CaseExcerpt, PageHeader, PivotSection } from '~/components'

  export default {
    components: {
      CaseExcerpt,
      PageHeader,
      PivotSection
    },
    asyncData,
    head
  }
</script>

<style>

.page-case__overview {
  display: flex;
  flex-direction: column;
  margin: var(--spacing-large) 0 0 0;
}

.page-case__overview-item {
  width: 100%;
  margin-bottom: var(--spacing-big);
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

@media (min-width: 1100px) {
  .page-case__overview-item {
    width: calc(33% - (var(--spacing-medium) * 2));
    margin-bottom: var(--spacing-larger);
    margin-left: var(--spacing-medium);
    margin-right: var(--spacing-medium);
  }
}
</style>
