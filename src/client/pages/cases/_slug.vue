<template>
  <main class="page-case grid">
    <page-header
      heading="headline"
      byline="Case study"
      :headline="page.title"
      :image="page.heroIllustration"
      break-out-image
      is-animated
      :animation-delay="page.title.length * typeDurationLetter"
    />

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

    <div class="page-case__case-teaser">
      <h2 class="h2">
        {{ page.caseTeaser.title }}
      </h2>
    </div>

    <article class="page-case__content">
      <template v-for="item in page.content">
        <div
          :id="item.id"
          v-if="item.__typename === 'TextSectionRecord'"
          :key="item.id"
          class="page-case__text">
          <h3
            class="page-case__title h3"
            v-if="item.title"
          >
            {{ item.title }}
          </h3>
          <rich-text-block
            v-if="item.body"
            :text="item.body"
            large-text
          />
        </div>

        <div
          v-if="item.__typename === 'CallToActionRecord'"
          :key="item.id"
          :id="item.id"
          class="page-case__text"
        >
          <blockquote-block
            :title="item.title"
            :body="item.body"
            :link-label="item.linkLabel"
            :link-url="item.linkUrl"
          />
        </div>

        <full-width-image
          :id="item.id"
          v-if="item.__typename === 'ImageRecord' && isFullWidth(item)"
          :key="item.id"
          :image="item.image"
        />

        <responsive-image
          :id="item.id"
          v-if="item.__typename === 'ImageRecord' && !isFullWidth(item)"
          :key="item.id"
          :image="item.image"
          :caption="item.caption"
        />

        <image-with-description
          :id="item.id"
          v-if="item.__typename === 'ImageWithTextRecord'"
          :key="item.id"
          :image="item.imageWithDescription.image"
          :inverse="item.imageWithDescription.inverse"
          :description="item.imageWithDescription.description"
        />

        <storytelling-section
          :id="item.id"
          v-if="item.__typename === 'StorytellingBlockRecord'"
          :key="item.id"
          :items="item.storyItem.items"
          :title="item.storyItem.title"
        />

        <testimonial-block
          :id="item.id"
          v-if="item.__typename === 'TestimonialBlockRecord'"
          :key="item.id"
          :testimonial="item.testimonial"
          class="page-case__text"
        />

        <quote-block
          :id="item.id"
          v-if="item.quote"
          :key="item.id"
          :quote="item.quote"
          :cite="item.author"
          class="page-case__text page-case__quote"
        />

        <responsive-video
          :id="item.id"
          v-if="item.__typename === 'ResponsiveVideoRecord'"
          :key="item.id"
          :video="item.video"
          :gif="item.gif"
          :autoplay="item.autoplay"
          :loop="item.loop"
          :mute="item.autoplay"
        />
      </template>

      <quote-block
        v-if="page.quote"
        :quote="page.quote"
        :cite="page.author"
      />
    </article>

    <breadcrumbs-block
      :back-link="localeUrl('cases')"
      :back-link-label="$t('all_cases')"
      :next-link="localeUrl({ name: 'cases-slug', params: { slug: nextCase.slug } })"
      :next-link-label="nextCase.title"
    />

    <section class="page-cases__pivots grid">
      <pivot-list
        v-if="page.pivots && page.pivots.length"
        :pivots="page.pivots"
        :can-have-border-top="false"
      />
      <div class="page-cases__scroll-to">
        <scroll-to direction="up" />
      </div>
    </section>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  export default {
    asyncData,
    data() {
      return {
        typeDurationLetter: .05, // average duration per letter in seconds
      }
    },
    computed: {
      nextCase() {
        const { cases, page } = this
        const index = cases.findIndex( ({ slug }) => slug === page.slug )
        const nextCaseIndex = index + 1 < cases.length ? index + 1 : 0
        return cases[nextCaseIndex]
      },
    },
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
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
    --page-section-max-width: 830px;
    --page-section-breakout-width: 1050px;
    --case-full-width-image-height: 515px; /* value according to design */
  }

  .page-case__case-meta {
    margin-bottom: var(--spacing-larger);
    grid-column-start: 2;
    grid-column-end: 50;
    grid-row: 2;
  }

  .page-case__case-teaser {
    grid-column-start: 2;
    grid-column-end: 50;
    grid-row: 3;
    margin-bottom: var(--spacing-large);
  }

  .page-case__content {
    grid-row: 4;
    grid-column: var(--grid-page);
    padding: 0 var(--spacing-small);
  }

  .page-case__content,
  .page-case__content > *:not(:last-child) {
    margin-bottom: var(--spacing-larger);
  }

  .page-case .breadcrumbs-block {
    margin-bottom: var(--spacing-large);
    grid-row: 5;
  }

  .page-case__title {
    margin-bottom: var(--spacing-smaller);
  }

  .page-case__content .storytelling-section {
    padding: var(--spacing-larger) var(--spacing-small);
  }

  .page-case__text {
    margin-left: auto;
    margin-right: auto;
    max-width: var(--page-section-max-width);
  }

  .page-case__text video {
    max-width: 100%; /* temporary fix for mvp should refactored after mvp */
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

  .page-cases__pivots .pivot-list__scroll-to {
    grid-row-start: 1;
    grid-row-end: 1;
  }

  .page-cases__pivots {
    position: relative;
    grid-column: var(--grid-page);
  }

  .page-cases__scroll-to {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 55px;
    grid-column-start: -2;
    grid-column-end: -3;
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

    .page-case__content,
    .page-case__content > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }

    .page-cases__scroll-to {
      display: block;
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

    .page-case__case-meta {
      margin-bottom: var(--spacing-big);
    }

    .page-case__case-meta,
    .page-case__case-teaser {
      grid-column-start: 4;
      grid-column-end: 49;
    }

    .page-case__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .page-case__content,
    .page-case__content > *:not(:last-child) {
      margin-bottom: var(--spacing-bigger);
    }

    .page-case__quote {
      max-width: var(--page-section-breakout-width);
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

    .page-case .breadcrumbs-block {
      grid-column-start: 6;
      grid-column-end: 46;
      margin-bottom: var(--spacing-larger);
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
