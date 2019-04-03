<template>
  <div class="page-blog-post grid" lang="en">
    <page-header-detail
      class="page-blog-post__header"
      :title="page.title"
      :sub-title="page.subtitle"
      :image="page.headerIllustration"
    />

    <article class="page-blog-post-list">
      <text-block>
        <h3 class="font-html-blue testimonial">{{ page.introTitle }}</h3>
      </text-block>

      <template v-for="item in page.items">
        <code-block
          class="page-blog-post-list--full-width"
          v-if="item.__typename === 'CodeBlockRecord' && item.body"
          :language="item.language"
          :content="item.body"
          :key="item.body" />

        <image-with-description
          class="page-blog-post-list__image page-blog-post-list--full-width"
          v-if="item.__typename === 'ImageWithTextRecord'"
          :key="item.description"
          :image="item.imageWithDescription.image"
          :inverse="item.imageWithDescription.inverse"
          :description="item.imageWithDescription.description" />

        <quote-block
          v-if="item.quote"
          :key="item.quote"
          :quote="item.quote"
          :cite="item.author"
        />

        <responsive-image
          class="page-blog-post-list__image"
          :class="{ 'page-blog-post-list--full-width' : item.fullWidth}"
          v-if="item.__typename === 'ImageRecord' && item.image"
          :key="item.image.url"
          :image="item.image"
        />

        <responsive-video
          v-if="item.__typename === 'ResponsiveVideoRecord'"
          :key="item.video ? item.video.title : item.gif.title"
          :video="item.video"
          :gif="item.gif"
          :autoplay="item.autoplay"
          :loop="item.loop"
          :mute="item.autoplay"
        />

        <div
          v-if="item.__typename === 'TextSectionRecord'"
          :key="item.title || item.body"
          class="page-blog-post-list__text"
        >
          <h3
            v-if="item.title"
            class="page-blog-post-list__title h3 font-html-blue"
            :id="slugify(item.title)">
            {{ item.title }}
          </h3>
          <rich-text-block
            v-if="item.body"
            :text="item.body"
            large-text
          />
        </div>

        <div
          v-if="item.__typename === 'LinkSectionRecord'"
          :key="item.link">
          <app-button
            class="page-blog-post__button"
            :external="item.external"
            :label="item.label"
            :to="item.link"
          />
        </div>
      </template>
    </article>

    <aside class="page-blog-post__aside">
      <blog-author class="page-blog-post__aside-author" :item="page" />
      <social-share-buttons
        :title="page.socialTitle"
        :twitter-title="page.title"
      />
      <toc-section :items="tocItems" />
    </aside>

    <div class="page-blog-post__link-container">
      <nuxt-link class="app-button app-button--secondary body font-bold" :to="localeUrl('blog')">
        &larr; {{ $t('all_blogposts') }}
      </nuxt-link>
    </div>

    <div class="page-blog-post__cta grid">
      <!-- TODO: Make this a section to be defined in DATO (once for all blog pages) -->
      <pivot-section
        v-if="pivots && pivots.length"
        class="page-blog-post__pivot-section"
        :pivot="pivots[0]"
      />
      <scroll-to direction="up" />
    </div>

    <style v-if="page.customStyling" v-html="page.customStyling"></style>
    <script v-if="page.customScript && loadCustomScript" v-html="page.customScript"/>
  </div>
</template>

<script>
import asyncData from '~/lib/async-page'
import head from '~/lib/seo-head'
import {
  AppButton,
  BlogAuthor,
  CodeBlock,
  PivotSection,
  ImageWithDescription,
  PageHeaderDetail,
  QuoteBlock,
  ResponsiveImage,
  ResponsiveVideo,
  RichTextBlock,
  ScrollTo,
  SocialShareButtons,
  TocSection,
  TextBlock,
} from '~/components'

export default {
  components: {
    AppButton,
    BlogAuthor,
    CodeBlock,
    PivotSection,
    ImageWithDescription,
    PageHeaderDetail,
    QuoteBlock,
    ResponsiveImage,
    ResponsiveVideo,
    RichTextBlock,
    ScrollTo,
    SocialShareButtons,
    TocSection,
    TextBlock,
  },
  asyncData,
  data () {
    return {
      /*
       * Load custom script after vue has mounted,
       * to prevent issues with the moment the custom script is executed and hydration.
       */
      loadCustomScript: false,
    }
  },
  computed: {
    tocItems () {
      return this.page.items
        .filter(item => item.title)
        .map(({ title }) => {
          return {
            slug: this.slugify(title),
            title
          }
        })
    }
  },
  mounted () {
    this.loadCustomScript = true
  },
  methods: {
    slugify(title) {
      return `${title.replace(/[^A-Za-z]+/g, '-').toLowerCase()}`
    }
  },
  head,
}
</script>

<style>
  .page-blog-post__header {
    grid-column: var(--grid-page);
  }

  .page-blog-post__header,
  .page-blog-post__aside-author,
  .page-blog-post__button {
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post-list > * {
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post-list__image {
    justify-content: space-between;
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post-list__image .image-with-description__description {
    margin-left: 0;
    margin-right: 0;
  }

  .page-blog-post-list__title {
    margin-bottom: var(--spacing-smaller);
  }

  .page-blog-post__aside {
    display: flex;
    justify-content: space-between;
    grid-row: 2;
  }

  .page-blog-post__link-container {
    grid-row: 4;
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-blog-post__cta {
    grid-column: var(--grid-page);
    grid-row: 5;
    background-color: var(--bg-pastel);
  }

  .page-blog-post__pivot-section.pivot-section {
    border: none;
  }

  .page-blog-post-list {
    grid-row: 3;
    max-width: 100%;
  }

  .page-blog-post-list em {
    font-style: italic;
  }

  .page-blog-post-list .responsive-video {
    width: 100%;
    max-width: var(--case-content-max-width-l);
  }

  .page-blog-post__cta .scroll-to {
    display: none;
  }

  @media (min-width: 720px) {
    .page-blog-post-list > * {
      margin-bottom: var(--spacing-larger);
      padding: 0 var(--spacing-larger);
    }

    .page-blog-post-list .page-blog-post-list--full-width {
      padding: 0;
    }

    .page-blog-post__header,
    .page-blog-post__button {
      margin-bottom: var(--spacing-larger);
    }

    .page-blog-post-list {
      grid-row: 2;
      grid-column-start: 10;
      grid-column-end: 50;
    }

    .page-blog-post__aside {
      display: block;
      grid-column-start: 2;
      grid-column-end: 9;
    }

    .page-blog-post__cta {
      position: relative;
    }

    .page-blog-post__cta .scroll-to {
      display: flex;
      position: absolute;
      bottom: var(--spacing-larger);
      grid-column: 48;
    }

    .page-blog-post__pivot-section {
      grid-column-start: 8;
      grid-column-end: 44;
    }

    .page-blog-post__link-container {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }

  @media (min-width: 1100px) {
    .page-blog-post-list > * {
      padding: 0 var(--spacing-big);
    }

    .page-blog-post-list {
      grid-column-start: 12;
      grid-column-end: 46;
    }

    .page-blog-post__aside {
      grid-column-start: 4;
      grid-column-end: 11;
    }

    .page-blog-post__pivot-section {
      grid-column-start: 14;
      grid-column-end: 38;
    }

    .page-blog-post__cta .scroll-to {
      bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1440px) {
    .page-blog-post-list > * {
      padding: 0 var(--spacing-bigger);
    }

    .page-blog-post-list {
      grid-column-start: 12;
      grid-column-end: 44;
    }
  }
</style>
