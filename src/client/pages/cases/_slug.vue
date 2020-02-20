<template>
  <div>
    <main class="grid">
      <page-header
        fill-screen
        heading="headline"
        byline="Case study"
        :headline="page.title"
        :image="page.heroIllustration"
      >
        <h2 class="sr-only">{{ $t('case_info') }}</h2>
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
      </page-header>

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
            <h3
              class="page-case__title h3"
              v-if="item.title">{{ item.title }}</h3>
            <rich-text-block
              v-if="item.body"
              :text="item.body"
              large-text
            />
          </div>

          <full-width-image
            v-if="item.__typename === 'ImageRecord' && isFullWidth(item)"
            :key="item.image.url"
            :image="item.image"
          />

          <responsive-image
            v-if="item.__typename === 'ImageRecord' && !isFullWidth(item)"
            :key="item.image.url"
            :image="item.image"
            :caption="item.caption"
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

        <quote-block v-if="page.quote" :quote="page.quote" :cite="page.author" />
      </article>

      <div class="page-case__link-container">
        <nuxt-link
          class="app-button app-button--secondary body font-bold"
          :to="localeUrl('cases')">
          &larr; {{ $t('all_cases') }}
        </nuxt-link>
      </div>

      <div class="page-case__contact-form grid">
        <contact-form
          class="grid"
          :title="$t('lets_discuss')"
          :contact-person="page.contactPerson"
        />
        <scroll-to direction="up" />
      </div>
    </main>
    <newsletter-form />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import CaseMeta from '~/components/case-meta'
  import CasePullQuoteComposition from '~/components/case-pull-quote-composition'
  import CaseTeaser from '~/components/case-teaser'
  import FullWidthImage from '~/components/full-width-image'
  import ContactForm from '~/components/contact-form'
  import ImageWithDescription from '~/components/image-with-description'
  import PageHeader from '~/components/page-header'
  import QuoteBlock from '~/components/quote-block'
  import ResponsiveImage from '~/components/responsive-image'
  import ResponsiveVideo from '~/components/responsive-video'
  import RichTextBlock from '~/components/rich-text-block'
  import ScrollTo from '~/components/scroll-to'
  import StorytellingSection from '~/components/storytelling-section'
  import NewsletterForm from '~/components/newsletter-form'

  export default {
    components: {
      CaseMeta,
      CasePullQuoteComposition,
      CaseTeaser,
      ContactForm,
      FullWidthImage,
      ImageWithDescription,
      PageHeader,
      QuoteBlock,
      ResponsiveImage,
      ResponsiveVideo,
      RichTextBlock,
      ScrollTo,
      StorytellingSection,
      NewsletterForm,
    },
    asyncData,
    methods: {
      isFullWidth(item) {
        return item.image && item.fullWidth
      }
    },
    head,
  }
</script>

<style>
  :root {
    --image-resizer-max-width-m: 1060px;
    --image-resizer-max-width-l: 1300px;
    --case-content-max-width-m: 935px;
    --case-content-max-width-l: 1440px;
    --page-section-max-width: 640px;
    --case-full-width-image-height: 515px; /* value according to design */
  }

  .page-case__case-teaser {
    grid-column: var(--grid-page);
    grid-row: 2;
    margin: var(--spacing-large) 0;
  }

  .page-case__content {
    grid-row: 3;
    grid-column: var(--grid-page);
    padding: 0 var(--spacing-small);
  }

  .page-case__contact-form,
  .page-case__content,
  .page-case__content > *:not(:last-child) {
    margin-bottom: var(--spacing-larger);
  }

  .page-case__link-container {
    grid-row: 4;
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-case__contact-form {
    grid-column: var(--grid-page);
    grid-row: 5;
  }

  .page-case__title {
    margin-bottom: var(--spacing-smaller);
  }

  .page-case__content .storytelling-section {
    padding: var(--spacing-larger) var(--spacing-small);
  }

  .page-case__text video {
    max-width: 100%; /* temporary fix for mvp should refactored after mvp */
  }

  .page-case__contact-form .scroll-to {
    display: none;
  }

  .page-case__content .storytelling-section,
  .page-case__content .full-width-image {
    width: calc(100% + (var(--spacing-small) * 2));
    height: auto;
    margin-left: calc(-1 * var(--spacing-small));
    margin-right: calc(-1 * var(--spacing-small));
  }

  .page-case__content .responsive-video {
    width: 100%;
    max-width: var(--case-content-max-width-l);
  }

  @media (min-width: 720px) {
    .page-case__content {
      padding-left: var(--spacing-large);
      padding-right: var(--spacing-large);
    }

    .page-case__content .storytelling-section,
    .page-case__content .full-width-image {
      width: calc(100% + (var(--spacing-large) * 2));
      margin-left: calc(-1 * var(--spacing-large));
      margin-right: calc(-1 * var(--spacing-large));
    }

    .page-case__contact-form,
    .page-case__content,
    .page-case__content > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }

    .page-case__scroll-to {
      position: relative;
    }

    .page-case__contact-form .contact-form {
      grid-column-start: 1;
      grid-column-end: 49;
    }

    .page-case__contact-form {
      position: relative;
    }

    .page-case__contact-form .scroll-to {
      grid-column: 49;
      display: flex;
      position: absolute;
      bottom: 0;
    }
  }

  @media (min-width: 1100px) {
    .page-case__content .responsive-image {
      max-width: var(--image-resizer-max-width-m);
    }

    .page-case__content > * {
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
      max-width: var(--page-section-max-width);
    }

    .page-case__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .page-case__contact-form,
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
      max-width: var(--case-content-max-width-m);
    }

    .page-case__contact-form .contact-form {
      grid-column: var(--grid-page);
    }
  }

  @media (min-width: 1440px) {
    .page-case__content .responsive-image {
      max-width: var(--image-resizer-max-width-l);
    }

    .page-case__content .full-width-image {
      max-width: var(--case-content-max-width-l);
    }
  }
</style>
