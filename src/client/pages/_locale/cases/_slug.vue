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
      <h2 class="sr-only">Case meta</h2>
      <div class="page-case__scroll-to">
        <scroll-to point-down />
      </div>
      <case-meta
        class="page-case__case-meta"
        :expertise-title="page.metaData.expertisesTitle"
        :expertises="page.metaData.expertises"
        :technologies-title="page.metaData.technologiesTitle"
        :technologies="page.metaData.technologies"
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

    <article class="page-case__content">
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
            large-text
          />
        </div>
  
        <!-- <full-width-image
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
        /> -->

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

      <quote-block v-if="page.quote" :quote="page.quote" :cite="page.author" />
    </article>

    <div class="page-case__link-container">
      <nuxt-link
        class="app-button app-button--secondary body font-bold"
        :to="`/${currentLocale}/cases`">
        &larr; {{ page.backLinkTitle }}
      </nuxt-link>
    </div>

    <div class="page-case__get-in-touch-form grid">
      <get-in-touch-form
        :title="page.getInTouchTitle"
        :name-label="page.getInTouchForm.nameLabel"
        :name-placeholder="page.getInTouchForm.namePlaceholder"
        :name-error-message="page.getInTouchForm.nameErrorMessage"
        :email-label="page.getInTouchForm.emailLabel"
        :email-placeholder="page.getInTouchForm.emailPlaceholder"
        :email-error-message-empty="page.getInTouchForm.emailErrorMessageEmpty"
        :email-error-message-incorrect="page.getInTouchForm.emailErrorMessageIncorrect"
        :phone-label="page.getInTouchForm.phoneLabel"
        :phone-placeholder="page.getInTouchForm.phonePlaceholder"
        :phone-error-message="page.getInTouchForm.phoneErrorMessage"
        :summary-label="page.getInTouchForm.summaryLabel"
        :summary-placeholder="page.getInTouchForm.summaryPlaceholder"
        :summary-error-message="page.getInTouchForm.summaryErrorMessage"
        :cta-label="page.getInTouchForm.ctaButtonLabel"
      />
      <scroll-to point-up />
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import {
    CaseMeta,
    CasePullQuoteComposition,
    CaseTeaser,
    FullWidthImage,
    GetInTouchForm,
    ImageWithDescription,
    PageHeaderDetail,
    QuoteBlock,
    ResponsiveImage,
    ResponsiveVideo,
    RichTextBlock,
    ScrollTo,
    StorytellingSection,
  } from '~/components'

  export default {
    async asyncData({ store, route, error }) {
      try {
        return await store.dispatch('getData', { route })
      } catch (err) {
        return error({ statusCode: 404, message: err.message })
      }
    },
    components: {
      CaseMeta,
      CasePullQuoteComposition,
      CaseTeaser,
      FullWidthImage,
      GetInTouchForm,
      ImageWithDescription,
      PageHeaderDetail,
      QuoteBlock,
      ResponsiveImage,
      ResponsiveVideo,
      RichTextBlock,
      ScrollTo,
      StorytellingSection,
    },
    computed: {
      ...mapState([
        'locales',
        'currentLocale',
        'alternateUrl',
      ]),
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

  :root {
    --page-content-max-width: 935px;
    --case-full-width-image-height: 515px; /* value according to design */
  }
  
  .grid .page-case__content {
    grid-column: 1 / 51;
  }

  .grid .page-case__content > *:not(.storytelling-section),
  .grid .page-case__content > *:not(.full-width-image),
  .grid .page-case__content > *:not(.image-with-description),
  .grid .page-case__content > *:not(.image-with-description--inverse) {
    padding-left: var(--spacing-medium);
    padding-right: var(--spacing-medium);
  }

  .page-case__case-header {
    grid-column: var(--grid-page);
    grid-row: 1;
  }

  .page-case__scroll-to {
    grid-row: 1;
    grid-column: 2;
    position: absolute;
    bottom: 0;
  }

  .page-case__case-meta-container {
    grid-column: var(--grid-page);
    grid-row: 2;
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
    grid-column: var(--grid-page);
    grid-row: 6;
  }

  .page-case__content {
    grid-row: 4;
  }

  .page-case__title {
    margin-bottom: var(--spacing-small);
  }

  .page-case__link-container {
    grid-row: 5;
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-case__case-teaser {
    grid-column: var(--grid-page);
    grid-row: 3;
    margin: var(--spacing-large) 0;
  }

  .page-case__content .storytelling-section {
    padding: var(--spacing-larger) 0;
    width: 100%;
  }

  .page-case__text video {
    max-width: 100%; /* temporary fix for mvp should refactored after mvp */
  }

  .page-case__get-in-touch-form .scroll-to {
    display: none;
  }

  @media (min-width: 720px) {
    .page-case__get-in-touch-form,
    .page-case__content,
    .page-case__content > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }

    .page-case__scroll-to {
      position: relative;
    }

    .page-case__case-header .page-header-detail__container {
      grid-column-start: 4;
      grid-column-end: 48;
    }

    .page-case__get-in-touch-form .get-in-touch-form {
      grid-column-start: 1;
      grid-column-end: 49;
    }

    .page-case__get-in-touch-form {
      position: relative;
    }

    .page-case__get-in-touch-form .scroll-to {
      display: flex;
      position: absolute;
      bottom: 0;
      grid-column: 49;
    }
  }

  @media (min-width: 1100px) {
    .grid .page-case__content > *:not(.storytelling-section),
    .grid .page-case__content > *:not(.full-width-image),
    .grid .page-case__content > *:not(.image-with-description),
    .grid .page-case__content > *:not(.image-with-description--inverse) {
      padding-left: 0;
      padding-right: 0;
    }

    .page-case__case-meta-container {
      padding: 0;
    }

    .page-case__case-teaser {
      margin: var(--spacing-larger) 0 0 0;
    }

    .page-case__text {
      max-width: 640px;
    }

    .page-case__content {
      grid-column-start: 1;
      grid-column-end: 52;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .page-case__get-in-touch-form,
    .page-case__content,
    .page-case__content > *:not(:last-child) {
      margin-bottom: var(--spacing-bigger);
    }

    .page-case__link-container {
      grid-column-start: 4;
      grid-column-end: 48;
    }

    .page-case__content .full-width-image {
      height: var(--case-full-width-image-height);
    }

    .page-case__content .image-with-description {
      max-width: var(--page-content-max-width);
    }

    .page-case__get-in-touch-form .get-in-touch-form {
      grid-column: var(--grid-page);
    }
  }
</style>
