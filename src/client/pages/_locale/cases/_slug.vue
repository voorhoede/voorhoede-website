<template>
  <section class="page-cases">
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
      :title="page.caseTeaser.caseTeaserTitle"
      :image="page.caseTeaser.caseTeaserImage"
    />

    <section class="grid">
      <template v-for="(item, index) in page.content">
        <div v-if="item.body" :key="index" class="page-cases__text">
          <h3 class="page-cases__title h3">{{ item.title }}</h3>
          <rich-text-block
            :text="item.body"
          />
        </div>
        
        <responsive-image
          v-if="item.image && !item.image.fullWidth"
          :key="index"
          :image="item.image"
        />

        <full-width-image
          v-if="item.image && item.image.fullWidth"
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
    </section>

  </section>
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
  }
</script>

<style>
  .case-meta {
    margin-bottom: var(--spacing-large);
    padding-top: var(--spacing-medium);
    padding-bottom: var(--spacing-large);
    background-color: var(--bg-pastel);
  }

  .page-cases__title {
    margin-bottom: var(--spacing-small);
  }

  .page-cases .rich-text {
    margin-bottom: var(--spacing-larger);
  }

  .page-cases .responsive-image {
    margin-bottom: var(--spacing-larger);
  }

  .page-cases .quote-block {
    margin-bottom: var(--spacing-bigger);
  }

  @media (min-width: 720px) {
    .case-meta {
      margin-bottom: var(--spacing-larger);
    }

    .page-cases .rich-text,
    .page-cases .responsive-image {
      margin-bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1100px) {
    .case-meta {
      margin-bottom: var(--spacing-big);
    }

    .page-cases__text {
      grid-column-start: 14;
      grid-column-end: 37;
    }

    .page-cases .rich-text,
    .page-cases .responsive-image {
      margin-bottom: var(--spacing-bigger);
    }
  }
</style>
