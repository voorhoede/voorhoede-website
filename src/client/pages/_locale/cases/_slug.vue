<template>
  <main class="page-cases grid">
    <page-header detail-page brick :title="page.title" :sub-title="'Case study'">
      <img slot="image" :src="page.heroIllustration.url" alt="">
    </page-header>

    <aside class="page-cases__case-meta-container grid">
      <case-meta
        class="page-cases__case-meta"
        :expertise-title="page.metaData.expertisesTitle"
        :expertises="page.metaData.expertises"
        :platform-title="page.metaData.platformsTitle"
        :platforms="page.metaData.platforms"
        :deliverable-title="page.metaData.deliverableTitle"
        :deliverables="page.metaData.deliverables"
        :interested-title="page.metaData.interestedTitle"
        :interested-link-label="page.metaData.interestedLinkLabel"
        :interested-link-url="page.metaData.interestedLinkUrl"
      />
    </aside>

    <div class="page-cases__case-teaser grid">
      <case-teaser
        v-if="page.caseTeaser"
        :title="page.caseTeaser.title"
        :image="page.caseTeaser.image"
      />
    </div>

    <section class="page-cases__content grid">
      <template v-for="(item, index) in page.content">
        <div v-if="item.body" :key="index" class="page-cases__text">
          <h3 class="page-cases__title h3">{{ item.title }}</h3>
          <rich-text-block
            :text="item.body"
          />
        </div>

        <responsive-image
          v-if="item.image && !item.fullWidth"
          :key="index"
          :image="item.image"
        />

        <case-pull-quote-composition
          v-if="item.pullquote"
          :key="index"
          :pullquote="item.pullquote.quote"
          :image="item.pullquote.illustration"
          :text="item.pullquote.richText"
        />
      </template>
      <quote-block :quote="page.quote" :cite="page.author" />
    </section>
    <div class="page-cases__link-container">
      <nuxt-link class="font-html-blue body font-bold" :to="`/${currentLocale}/cases`">&larr; See all cases</nuxt-link>
    </div>
    <aside class="page-cases__get-in-touch-form">
      <get-in-touch-form
        :title="page.getInTouchTitle"
        :name-label="page.getInTouchForm.nameLabel"
        :name-placeholder="page.getInTouchForm.namePlaceholder"
        :email-label="page.getInTouchForm.emailLabel"
        :email-placeholder="page.getInTouchForm.emailPlaceholder"
        :phone-label="page.getInTouchForm.phoneLabel"
        :phone-placeholder="page.getInTouchForm.phonePlaceholder"
        :summary-label="page.getInTouchForm.summaryLabel"
        :summary-placeholder="page.getInTouchForm.summaryPlaceholder"
        :cta-label="page.getInTouchForm.ctaButtonLabel"
      />
    </aside>
  </main>
</template>

<script>
  import query from './_slug.query.graphql'
  import { mapState } from 'vuex'

  import {
    CaseMeta,
    CasePullQuoteComposition,
    CaseTeaser,
    GetInTouchForm,
    PageHeader,
    ResponsiveImage,
    RichTextBlock,
    QuoteBlock,
  } from '~/components'

  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { query, route })
    },
    components: {
      CaseMeta,
      CasePullQuoteComposition,
      CaseTeaser,
      GetInTouchForm,
      PageHeader,
      ResponsiveImage,
      RichTextBlock,
      QuoteBlock,
    },
    computed: {
      ...mapState([
        'locales',
        'currentLocale',
        'alternateUrl',
      ]),
    }
  }
</script>

<style>
  :root {
    --view-height-largea: 89vh;
  }

  .page-cases__case-meta-container {
    grid-column: page;
    background-color: var(--bg-pastel);
    padding: var(--spacing-small) 0 var(--spacing-large) 0;
  }

  .page-cases__case-meta {
    grid-column-start: 4;
  }

  .page-cases__get-in-touch-form,
  .page-cases__content,
  .page-cases__content > *:not(:last-child) {
    margin-bottom: var(--spacing-larger);
  }

  .page-cases__get-in-touch-form {
    grid-column: page;
  }

  .page-cases__content {
    grid-column: page;
  }

  .page-cases__title {
    margin-bottom: var(--spacing-small);
  }

  .page-cases__link-container {
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-cases__case-teaser {
    grid-column: page;
    margin: var(--spacing-large) 0;
  }

  .page-cases__scroll-to {
    position: absolute;
    top: var(--view-height-large);
    left: var(--grid-margin);
  }

  @media (min-width: 720px) {
    .page-cases__get-in-touch-form,
    .page-cases__content,
    .page-cases__content > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1100px) {
    .page-cases__case-meta-container {
      padding: 0;
    }

    .page-cases__case-teaser {
      margin: var(--spacing-larger) 0 0 0;
    }

    .page-cases__text {
      grid-column-start: 14;
      grid-column-end: 39;
    }

    .page-cases .quote-block {
      grid-column-start: 12;
      grid-column-end: 39;
    }

    .page-cases__get-in-touch-form,
    .page-cases__content,
    .page-cases__content > *:not(:last-child) {
      margin-bottom: var(--spacing-bigger);
    }

    .page-cases__link-container {
      grid-column-start: 4;
      grid-column-end: -4;
    }
  }

  @media (min-width: 1400px) {
    .page-cases__scroll-to {
      position: relative;
    }
  }
</style>
