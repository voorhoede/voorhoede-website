<template>
  <main class="grid">
    <page-header-detail
      has-brick
      :title="page.title"
      sub-title="Case study"
      :image="page.heroIllustration"
    />

    <aside class="page-case__case-meta-container grid">
      <case-meta
        class="page-case__case-meta"
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

    <div class="page-case__case-teaser">
      <case-teaser
        v-if="page.caseTeaser"
        :title="page.caseTeaser.title"
        :image="page.caseTeaser.image"
      />
    </div>

    <article class="page-case__content grid">
      <template v-for="(item, index) in page.content">
        <div v-if="item.body" :key="index" class="page-case__text">
          <h3 class="page-case__title h3">{{ item.title }}</h3>
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
    </article>

    <div class="page-case__link-container">
      <nuxt-link class="font-html-blue body font-bold" :to="`/${currentLocale}/cases`">&larr; See all cases</nuxt-link>
    </div>

    <div class="page-case__get-in-touch-form">
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
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'

  import {
    CaseMeta,
    CasePullQuoteComposition,
    CaseTeaser,
    GetInTouchForm,
    PageHeaderDetail,
    ResponsiveImage,
    RichTextBlock,
    QuoteBlock,
  } from '~/components'

  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    components: {
      CaseMeta,
      CasePullQuoteComposition,
      CaseTeaser,
      GetInTouchForm,
      PageHeaderDetail,
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
    --view-height-large: 89vh;
  }

  .page-case__case-meta-container {
    grid-column: page;
    background-color: var(--bg-pastel);
    padding: var(--spacing-small) 0 var(--spacing-large) 0;
  }

  .page-case__case-meta {
    grid-column-start: 4;
  }

  .page-case__get-in-touch-form,
  .page-case__content,
  .page-case__content > *:not(:last-child) {
    margin-bottom: var(--spacing-larger);
  }

  .page-case__get-in-touch-form {
    grid-column: page;
  }

  .page-case__content {
    grid-column: page;
  }

  .page-case__title {
    margin-bottom: var(--spacing-small);
  }

  .page-case__link-container {
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-case__case-teaser {
    grid-column: page;
    margin: var(--spacing-large) 0;
  }

  .page-case__scroll-to {
    position: absolute;
    top: var(--view-height-large);
    left: var(--grid-margin);
  }

  @media (min-width: 720px) {
    .page-case__get-in-touch-form,
    .page-case__content,
    .page-case__content > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1100px) {
    .page-case__case-meta-container {
      padding: 0;
    }

    .page-case__case-teaser {
      margin: var(--spacing-larger) 0 0 0;
    }

    .page-case__text {
      grid-column-start: 14;
      grid-column-end: -14;
    }

    .page-case .quote-block {
      grid-column-start: 12;
      grid-column-end: -12;
    }

    .page-case__get-in-touch-form,
    .page-case__content,
    .page-case__content > *:not(:last-child) {
      margin-bottom: var(--spacing-bigger);
    }

    .page-case__link-container {
      grid-column-start: 4;
      grid-column-end: -4;
    }
  }

  @media (min-width: 1400px) {
    .page-case__scroll-to {
      position: relative;
    }
  }
</style>
