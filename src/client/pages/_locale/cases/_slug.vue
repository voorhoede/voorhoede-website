<template>
  <main class="page-cases">
    <page-header-detail brick :title="page.title" :sub-title="'Case study'">
      <img slot="image" :src="page.heroIllustration.url" alt="">
    </page-header-detail>

    <case-meta
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

    <case-teaser
      v-if="page.caseTeaser"
      :title="page.caseTeaser.title"
      :image="page.caseTeaser.image"
    />

    <section class="grid page-cases__content">
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

        <full-width-image
          v-if="item.image && item.fullWidth"
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
    <nuxt-link class="page-cases__link font-html-blue body font-bold" :to="`/${currentLocale}/cases`">See all cases</nuxt-link>

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
  </main>
</template>

<script>
  import query from './_slug.query.graphql'
  import { CaseMeta } from '~/components'
  import { CasePullQuoteComposition } from '~/components'
  import { CaseTeaser } from '~/components'
  import { FullWidthImage } from '~/components'
  import { GetInTouchForm } from '~/components'
  import { PageHeaderDetail } from '~/components'
  import { ResponsiveImage } from '~/components'
  import { RichTextBlock } from '~/components'
  import { QuoteBlock } from '~/components'
  import { mapState } from 'vuex'

  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { query, route })
    },
    components: {
      CaseMeta,
      CasePullQuoteComposition,
      CaseTeaser,
      FullWidthImage,
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
  .case-meta {
    margin-bottom: var(--spacing-large);
    padding-top: var(--spacing-medium);
    padding-bottom: var(--spacing-large);
    background-color: var(--bg-pastel);
  }

  .page-cases .get-in-touch-form,
  .page-cases__content,
  .page-cases__content > *:not(:last-child) {
    margin-bottom: var(--spacing-larger);
  }

  .page-cases__title {
    margin-bottom: var(--spacing-small);
  }

  .page-cases__link {
    grid-column: content;
  }

  @media (min-width: 720px) {
    .case-meta {
      margin-bottom: var(--spacing-larger);
      height: 23.5vh;
    }

    .page-cases .get-in-touch-form,
    .page-cases__content,
    .page-cases__content > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1100px) {
    .case-meta {
      margin-bottom: var(--spacing-big);
    }

    .page-cases__text {
      grid-column-start: 14;
      grid-column-end: 39;
    }

    .page-cases .quote-block {
      grid-column-start: 12;
      grid-column-end: 39;
    }

    .page-cases .get-in-touch-form,
    .page-cases__content,
    .page-cases__content > *:not(:last-child) {
      margin-bottom: var(--spacing-bigger);
    }
  }
</style>
