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
      <div 
        v-for="item in page.items" 
        :key="item.title" 
        :class="{'page-blog-post-list--not-indented' : item.__typename ==='ImageWithTextRecord'}"
      >
        <text-block
          v-if="item.__typename === 'TextSectionRecord' &&
          item.title"
          class="font-html-blue">
          <h2 class="page-blog-post-list__title h3">{{ item.title }}</h2>
        </text-block>

        <rich-text-block
          class="page-blog-post-list__rich-text list"
          v-if="item.__typename === 'TextSectionRecord' &&
          item.body"
          :text="item.body"
        />

        <image-with-description
          class="page-blog-post-list__image"
          v-if="item.__typename === 'ImageWithTextRecord' &&
          item.imageWithDescription"
          :image="item.imageWithDescription.image"
          :inverse="item.imageWithDescription.inverse"
          :description="item.imageWithDescription.description"
        />
      </div>
    </article>

    <aside class="page-blog-post__author">
      <blog-author :item="page" />
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
  ImageWithDescription,
  BlogAuthor,
  AppButton,
  SocialButtons,
  CtaBlock,
} from '~/components'
export default {
  components: {
  PageHeaderDetail,
  TextBlock,
  RichTextBlock,
  ImageWithDescription,
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
   :root {
    --list-bullet-size: 2px;
  }

  .page-blog-post__header {
    grid-column: page;
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post-list__intro {
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post-list__title {
    margin-bottom: var(--spacing-smaller);
  }

  .page-blog-post-list__rich-text {
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post-list__image {
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post__author {
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

  @media (min-width: 720px) {
    .page-blog-post-list > * {
      padding: 0 var(--spacing-big);
    }

    .page-blog-post-list--not-indented {
      padding: 0;
    }

    .page-blog-post-list {
      grid-column-start: 8;
      grid-column-end: 0;
    }
    
    .page-blog-post-list__rich-text {
      margin-bottom: var(--spacing-big);
    }

    .page-blog-post-list__image {
      margin-bottom: var(--spacing-big);
    }

    .page-blog-post__cta-block.cta-block {
      grid-column-start: 8;
      grid-column-end: -8;
    }

    .page-blog-post__author {
      grid-column-start: 0;
      grid-column-end: 8;
    }

    .page-blog-post__link-container {
      grid-column-start: 4;
      grid-column-end: -4;
    }
  }

  @media (min-width: 1100px) {
    .page-blog-post__header {
      margin-bottom: var(--spacing-big);
    }

    .page-blog-post-list {
      grid-column-start: 14;
      grid-column-end: -10;
    }

    .page-blog-post__cta-block.cta-block {
      grid-column-start: 14;
      grid-column-end: -14;
    }

    .page-blog-post__author {
      grid-column-start: 4;
      grid-column-end: 12;
    }
  }
 </style>
 