<template>
  <div class="page-blog-post grid" lang="en">
    <page-header-detail
      class="page-blog-post__header"
      :title="page.title"
      :sub-title="page.subtitle"
      :image="page.headerIllustration"
    />

    <article class="page-blog-post-list">
      <text-block class="page-blog-post-list__intro">
        <p class="font-html-blue testimonial">{{ page.introTitle }}</p>
      </text-block>

      <template v-for="item in page.items">
        <code-block
          class="page-blog-post-list__code-block"
          v-if="item.__typename === 'CodeBlockRecord' && item.body"
          :language="item.language"
          :content="item.body"
          :key="item.body" />

        <image-with-description
          class="page-blog-post-list__image page-blog-post-list--not-indented"
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
          class="page-blog-post__quote" />

        <responsive-image
          class="page-blog-post-list__image"
          :class="{ 'page-blog-post-list--not-indented' : item.fullWidth}"
          v-if="item.__typename === 'ImageRecord' && item.image"
          :key="item.image.url"
          :image="item.image" />

        <responsive-video
          v-if="item.__typename === 'ResponsiveVideoRecord'"
          :key="item.video.title"
          :video="item.video"
          :autoplay="item.autoplay"
          :loop="item.loop"
          :mute="item.autoplay" />

        <text-block
          v-if="item.__typename === 'TextSectionRecord' && item.title"
          :key="item.title">
          <h2 class="page-blog-post-list__title h3 font-html-blue">{{ item.title }}</h2>
        </text-block>

        <rich-text-block
          class="page-blog-post-list__rich-text"
          v-if="item.__typename === 'TextSectionRecord' && item.body"
          :key="item.body"
          :text="item.body"
          large-text />

        <div
          v-if="item.__typename === 'LinkSectionRecord'"
          :key="item.link">
          <app-button
            class="page-blog-post__button"
            :external="item.external ? true : false"
            :label="item.label"
            :to="item.link" />
        </div>
      </template>
    </article>

    <aside class="page-blog-post__aside">
      <blog-author class="page-blog-post__aside-author" :item="page" />
      <social-buttons
        :title="page.socialTitle"
        :share-title="page.title" />
    </aside>

    <div class="page-blog-post__link-container">
      <nuxt-link class="app-button app-button--secondary body font-bold" :to="`/${currentLocale}/blog`">
        &larr; See all posts
      </nuxt-link>
    </div>

    <div class="page-blog-post__cta grid">
      <cta-block
        class="page-blog-post__cta-block"
        :cta-label="page.callToActionLabel"
        :cta-to="{ name: 'locale-about-us', params: { locale: currentLocale } }">
        <template slot="heading">
          <h2 class="h3">{{ page.callToActionTitle }}</h2>
        </template>
        <template slot="body">
          <p class="body">{{ page.callToActionBody }}</p>
        </template>
      </cta-block>
      <scroll-to point-up />
    </div>

    <style v-if="page.customStyling" v-html="page.customStyling"></style>
    <script v-if="page.customScript && loadCustomScript" v-html="page.customScript"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  AppButton,
  BlogAuthor,
  CodeBlock,
  CtaBlock,
  ImageWithDescription,
  PageHeaderDetail,
  QuoteBlock,
  ResponsiveImage,
  ResponsiveVideo,
  RichTextBlock,
  ScrollTo,
  SocialButtons,
  TextBlock,
} from '~/components'

export default {
  components: {
    AppButton,
    BlogAuthor,
    CodeBlock,
    CtaBlock,
    ImageWithDescription,
    PageHeaderDetail,
    QuoteBlock,
    ResponsiveImage,
    ResponsiveVideo,
    RichTextBlock,
    ScrollTo,
    SocialButtons,
    TextBlock,
  },
  async asyncData({ store, route, error }) {
    try {
      return await store.dispatch('getData', { route })
    } catch (err) {
      return error({ statusCode: 404, message: err.message })
    }
  },
  data() {
    return {
      /*
       * Load custom script after vue has mounted,
       * to prevent issues with the moment the custom script is executed and hydration.
       */
      loadCustomScript: false
    }
  },
  computed: {
    ...mapState(['currentLocale'])
  },
  mounted() {
    this.loadCustomScript = true
  },
  head() {
    return {
      title: this.page.social.title,
      meta: [
        { 'name': 'description', 'content': this.page.social.description },
        { 'property': 'og:description', 'content': this.page.social.description },
        { 'name': 'twitter:description', 'content': this.page.social.description },
        { 'name': 'keywords', 'content': this.page.keywords }
      ]
    }
  }
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

  .page-blog-post__cta-block.cta-block {
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

    .page-blog-post-list > .page-blog-post-list--not-indented {
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
      grid-column: 3;
    }

    .page-blog-post__cta-block {
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

    .page-blog-post__cta-block {
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
