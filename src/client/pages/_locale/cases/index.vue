<template>
  <main class="page-cases">
    <page-header>
      <template slot="title">
        <h1 v-html="page.title"/>
      </template>
      <template slot="subTitle">
        <h2 v-html="page.subtitle"/>
      </template>
      <template v-if="page.headerIllustration" slot="image">
        <img :src="page.headerIllustration.url" alt="">
      </template>
    </page-header>
    <div class="grid">
      <ul class="page-case__overview">
        <li class="page-case__overview-item" v-for="caseItem in items" :key="caseItem.slug">
          <case-excerpt
            :case-id="caseItem.slug"
            primary-label="See more"
            :slug="caseItem.slug"
            :image-url="caseItem.heroIllustration ? caseItem.heroIllustration.url : null"
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
    }
  }
</script>

<style>
.page-case__overview {
  margin: var(--spacing-large) 0 0 0;
}

.page-case__overview .case-excerpt {
  margin-bottom: var(--spacing-big);
}

@supports (display: grid) {
  @media (min-width: 480px) {
    .page-case__overview {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: var(--spacing-medium);
    }

    .page-case__overview .case-excerpt {
      margin-bottom: var(--spacing-larger);
    }
  }

  @media (min-width: 720px) {
    .page-case__overview .case-excerpt {
      margin-bottom: 0;
    }

    .page-case__overview {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: var(--spacing-large);
      margin: var(--spacing-larger) 0;
    }
  }

  @media (min-width: 1100px) {
    .page-case__overview {
      grid-column-start: 4;
      grid-column-end: -4;
    }
  }
}
</style>
