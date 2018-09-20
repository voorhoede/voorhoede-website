<template>
  <main class="grid">
    <div class="page-case__case-header">
      <page-header-detail
        has-brick
        :title="page.title"
        sub-title="Case study"
        :image="page.heroIllustration"
      />
    </div>
    <aside class="page-case__case-meta-container grid">
      <div class="page-case__scroll-to">
        <scroll-to />
      </div>
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
      <template v-for="item in page.content">
        <div 
          v-if="item.__typename === 'TextSectionRecord'"
          :key="item.title" 
          class="page-case__text">
          <h3 class="page-case__title h3" 
              v-if="item.title">{{ item.title }}</h3>
          <rich-text-block 
            v-if="item.body" 
            :text="item.body"
          />
        </div>

        <full-width-image
          v-if="item.__typename === 'ImageRecord' &&
          item.image && item.fullWidth"
          :key="item.image.url"
          :image="item.image"
        />
        
        <responsive-image
          v-if="item.__typename === 'ImageRecord' &&
          item.image && !item.fullWidth"
          :key="item.image.url"
          :image="item.image"
        />

        <case-pull-quote-composition
          v-if="item.__typename === 'PullquoteRecord'"
          :key="item.pullquote.quote"
          :pullquote="item.pullquote.quote"
          :image="item.pullquote.illustration"
          :text="item.pullquote.richText"
        />
        
        <image-with-description
          v-if="item.__typename === 'ImageWithTextRecord'"
          :key="item.description"
          :image="item.imageWithDescription.image"
          :inverse="item.imageWithDescription.inverse"
          :description="item.imageWithDescription.description"
        />

        <storytelling-section
          v-if="item.__typename === 'StorytellingBlockRecord'"
          :key="item.storyItem.title"
          :items="item.storyItem.items"
          :title="item.storyItem.title"
        />
        <responsive-video 
          v-if="item.__typename === 'ResponsiveVideoRecord'"
          :key="item.video.title"
          :video="item.video" 
          :autoplay="item.autoplay" 
          :loop="item.loop" 
          :mute="item.autoplay" 
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
    StorytellingSection,
    FullWidthImage,
    ImageWithDescription,
    ResponsiveImage,
    RichTextBlock,
    ResponsiveVideo,
    QuoteBlock,
    ScrollTo,
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
      FullWidthImage,
      ImageWithDescription,
      StorytellingSection,
      ResponsiveImage,
      RichTextBlock,
      ResponsiveVideo,
      QuoteBlock,
      ScrollTo,
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
    --case-full-width-image-height: 515px; /* value according to design */
  }

  .page-case__case-header {
    grid-column: page;
  }

  .page-case__scroll-to {
    grid-row: 1;
    position: relative;
    margin-top: var(--spacing-big);
  }

  .page-case__case-meta-container {
    grid-column: page;
    background-color: var(--bg-pastel);
    padding: var(--spacing-small) 0 var(--spacing-large) 0;
  }

  .page-case__case-meta {
    grid-row: 1;
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

  .page-case__content .storytelling-section {
    grid-column: page;
    padding: var(--spacing-larger) 0;
  }
  
  @media (min-width: 720px) {
    .page-case__get-in-touch-form,
    .page-case__content,
    .page-case__content > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }

    .page-case__scroll-to {
      margin-top: var(--spacing-bigger);
    }

    .page-case__case-header .page-header-detail__container {
      grid-column-start: 4;
      grid-column-end: -4;
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

    .page-case__content .quote-block {
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
    
    .page-case__content .full-width-image {
      height: var(--case-full-width-image-height);
    }

    .page-case__content .image-with-description {
      grid-column-start: 8;
      grid-column-end: 0;
    }
    
    .page-case__content .image-with-description--inverse {
      grid-column-start: 0;
      grid-column-end: -8;
    }
  }
</style>
