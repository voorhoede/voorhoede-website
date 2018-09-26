<template>
  <div class="page-blog-post grid">
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
        <text-block
          v-if="item.__typename === 'TextSectionRecord' && item.title"
          :key="item.title"
        >
          <h2 class="page-blog-post-list__title h3 font-html-blue">{{ item.title }}</h2>
        </text-block>

        <rich-text-block
          class="page-blog-post-list__rich-text list"
          v-if="item.__typename === 'TextSectionRecord' && item.body"
          :key="item.body"
          :text="item.body"
        />
        
        <responsive-image
          class="page-blog-post-list__image"
          :class="{ 'page-blog-post-list--not-indented' : item.fullWidth}"
          v-if="item.__typename === 'ImageRecord' && item.image"
          :key="item.image.url"
          :image="item.image"
        />

        <image-with-description
          class="page-blog-post-list__image page-blog-post-list--not-indented"
          v-if="item.__typename === 'ImageWithTextRecord'"
          :key="item.description"
          :image="item.imageWithDescription.image"
          :inverse="item.imageWithDescription.inverse"
          :description="item.imageWithDescription.description"
        />
      </template>
    </article>

    <aside class="page-blog-post__aside">
      <blog-author class="page-blog-post__aside-author" :item="page" />
      <social-buttons :title="page.socialTitle" />
    </aside>

    <div class="page-blog-post__link-container">
      <nuxt-link class="font-html-blue body font-bold" :to="`/${currentLocale}/blog`">
        &larr; See all posts
      </nuxt-link>
    </div>

    <div class="page-blog-post__cta grid">
      <cta-block
        class="page-blog-post__cta-block"
        :cta-label="page.callToActionLabel"
        :cta-to="{ name: 'locale-contact', params: { locale: currentLocale } }"
      >
        <template slot="heading">
          <h2 class="h3">{{ page.callToActionTitle }}</h2>
        </template>
        <template slot="body">
          <p class="body">{{ page.callToActionBody }}</p>
        </template>
      </cta-block>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  PageHeaderDetail,
  TextBlock,
  RichTextBlock,
  FullWidthImage,
  ImageWithDescription,
  ResponsiveImage,
  BlogAuthor,
  AppButton,
  SocialButtons,
  CtaBlock,
} from '../../../components'

export default {
  components: {
    PageHeaderDetail,
    TextBlock,
    RichTextBlock,
    FullWidthImage,
    ImageWithDescription,
    ResponsiveImage,
    BlogAuthor,
    AppButton,
    SocialButtons,
    CtaBlock,
  },
  async asyncData({ store, route }) {
    return await store.dispatch('getData', { route })
  },
  computed: {
    ...mapState(['currentLocale'])
  }
}
</script>

 <style>
  .page-blog-post__header {
    grid-column: page;
  }

  .page-blog-post__header,
  .page-blog-post-list__intro,
  .page-blog-post-list__rich-text,
  .page-blog-post__aside-author {
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
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-blog-post__cta {
    grid-column: page;
    background: var(--bg-pastel);
  }

  .page-blog-post__cta-block.cta-block {
    border: none;
  }

  .page-blog-post-list :not(pre) code {
    font-family: monospace;
    background: #f5f2f0;
    padding: 0 .25rem;
    border: 1px solid #b3b3b3;
  }

  .page-blog-post-list em {
    font-style: italic;
  }

  @media (min-width: 720px) {
    .page-blog-post-list > * {
      padding: 0 var(--spacing-larger);
    }

    .page-blog-post-list--not-indented {
      padding: 0;
    }

    .page-blog-post__header,
    .page-blog-post-list__rich-text,
    .page-blog-post-list__image {
      margin-bottom: var(--spacing-big);
    }

    .page-blog-post-list {
      grid-column-start: 9;
    }
    
    .page-blog-post__aside {
      display: block;
      grid-column-end: 9;
    }

    .page-blog-post__cta-block.cta-block {
      grid-column-start: 8;
      grid-column-end: -8;
    }

    .page-blog-post__link-container {
      grid-column-start: 4;
      grid-column-end: -4;
    }
  }

  @media (min-width: 1100px) {
    .page-blog-post-list > * {
      padding: 0 var(--spacing-big);
    }

    .page-blog-post-list--not-indented {
      padding: 0;
    }

    .page-blog-post-list {
      grid-column-start: 14;
      grid-column-end: -10;
    }

    .page-blog-post__aside {
      grid-column-start: 4;
      grid-column-end: 12;
    }

    .page-blog-post__cta-block.cta-block {
      grid-column-start: 14;
      grid-column-end: -14;
    }
  }
 </style>
 