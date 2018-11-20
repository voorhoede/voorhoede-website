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
      <cta-block :cta-label="page.callToActionLabel" :cta-to="{ name: 'locale-contact', params: { locale: currentLocale } }">
        <template slot="heading">
          <h3 class="h4">{{ page.callToActionTitle }}</h3>
        </template>
      </cta-block>
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import { CaseExcerpt, PageHeader, CtaBlock } from '~/components'

  export default {
    components: {
      CaseExcerpt,
      PageHeader,
      CtaBlock
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    computed: {
      ...mapState(['currentLocale']),
    },
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
@import '../../../components/app-core/variables.css';

.page-case__overview {
  margin: var(--spacing-large) 0 0 0;
}

.page-case__overview .case-excerpt {
  margin-bottom: var(--spacing-big);
}

@media (min-width: 540px) {
  .page-case__overview {
    display: grid;
    grid-column: var(--grid-content);
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--spacing-medium);
  }

  .page-case__overview .case-excerpt {
    margin-bottom: var(--spacing-larger);
  }

  .page-case__overview-item:nth-child(2n - 1) {
    grid-column: 1;
  }

  .page-case__overview-item:nth-child(2n) {
    grid-column: 2;
  }

  .page-case__overview-item:nth-child(1),
  .page-case__overview-item:nth-child(2) {
    grid-row: 1;
  }

  .page-case__overview-item:nth-child(3),
  .page-case__overview-item:nth-child(4) {
    grid-row: 2;
  }

  .page-case__overview-item:nth-child(5),
  .page-case__overview-item:nth-child(6) {
    grid-row: 3;
  }

  .page-case__overview-item:nth-child(7),
  .page-case__overview-item:nth-child(8) {
    grid-row: 4;
  }

  .page-case__overview-item:nth-child(9),
  .page-case__overview-item:nth-child(10) {
    grid-row: 5;
  }
  
  .page-case__overview-item:nth-child(11),
  .page-case__overview-item:nth-child(12) {
    grid-row: 6;
  }
  
  .page-case__overview-item:nth-child(13),
  .page-case__overview-item:nth-child(14) {
    grid-row: 7;
  }

  .page-case__overview-item:nth-child(15),
  .page-case__overview-item:nth-child(16) {
    grid-row: 8;
  }
  
  .page-case__overview-item:nth-child(17),
  .page-case__overview-item:nth-child(18) {
    grid-row: 9;
  }
}

@media (min-width: 720px) {
  .page-case__overview .case-excerpt {
    margin-bottom: 0;
  }

  .page-case__overview {
    grid-gap: var(--spacing-large);
    margin: var(--spacing-larger) 0;
  }
}

@media (min-width: 1200px) {
  .page-case__overview {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-start: 4;
    grid-column-end: 48;
  }
  
  .page-case__overview-item:nth-child(3n - 2) {
    grid-column: 1;
  }

  .page-case__overview-item:nth-child(3n - 1) {
    grid-column: 2;
  }

  .page-case__overview-item:nth-child(3n) {
    grid-column: 3;
  }

  .page-case__overview-item:nth-child(1),
  .page-case__overview-item:nth-child(2),
  .page-case__overview-item:nth-child(3) {
    grid-row: 1;
  }

  .page-case__overview-item:nth-child(4),
  .page-case__overview-item:nth-child(5),
  .page-case__overview-item:nth-child(6) {
    grid-row: 2;
  }

  .page-case__overview-item:nth-child(7),
  .page-case__overview-item:nth-child(8),
  .page-case__overview-item:nth-child(9) {
    grid-row: 3;
  }

  .page-case__overview-item:nth-child(10),
  .page-case__overview-item:nth-child(11),
  .page-case__overview-item:nth-child(12) {
    grid-row: 4;
  }

  .page-case__overview-item:nth-child(13),
  .page-case__overview-item:nth-child(14),
  .page-case__overview-item:nth-child(15) {
    grid-row: 5;
  }
  
  .page-case__overview-item:nth-child(16),
  .page-case__overview-item:nth-child(17),
  .page-case__overview-item:nth-child(18) {
    grid-row: 6;
  }
}
</style>
