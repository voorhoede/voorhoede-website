<template>
  <main class="page-cases">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />
    <div class="grid">
      <ul class="page-case__overview">
        <li class="page-case__overview-item" v-for="caseItem in items" :key="caseItem.slug">
          <case-excerpt
            :case-id="caseItem.slug"
            :primary-label="page.casePrimaryButtonLabel"
            :slug="caseItem.slug"
            :image="caseItem.heroIllustration"
            :title="caseItem.title"
            :body="caseItem.subtitle"
          />
        </li>
      </ul>
    </div>
    <div class="grid">
      <cta-block :cta-label="page.callToActionLabel" :cta-to="localePath('contact')">
        <template slot="heading">
          <h3 class="h4">{{ page.callToActionTitle }}</h3>
        </template>
      </cta-block>
    </div>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import { CaseExcerpt, PageHeader, CtaBlock } from '~/components'

  export default {
    components: {
      CaseExcerpt,
      PageHeader,
      CtaBlock
    },
    asyncData,

    head() {
      return {
        title: this.page.social.title,
        meta: [
          { 'name': 'description', 'content': this.page.social.description },
          { 'name': 'description', 'content': this.page.social.description },
          { 'property': 'og:description', 'content': this.page.social.description },
          { 'name': 'keywords', 'content': this.page.keywords }
        ]
      }
    }
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
