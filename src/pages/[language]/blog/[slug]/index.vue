<template>
  <main
    class="page-blog-post grid"
    lang="en"
  >
    <page-header
      class="page-blog-post__header"
      heading="headline"
      :headline="data.page.title"
      :byline="data.page.subtitle"
      :image="data.page.headerIllustration"
    />

    <aside class="page-blog-post__aside">
      <blog-author
        class="page-blog-post__aside-author"
        :item="data.page"
      />
      <social-share-buttons
        :base-url="runtimeConfig.public.baseUrl"
        :title="data.page.socialTitle"
        :twitter-title="data.page.title"
        :authors="data.page.authors"
      />
      <toc-section :items="tocItems" />
    </aside>

    <article class="page-blog-post-list">
      <div
        v-if="data.page.isArchived"
      >
        <div class="page-blog-post__archived">
          <p class="font-html-blue body-big">
            {{ $t('archived_blogpost') }}
          </p>

          <app-button
            class="page-blog-post__archived-button"
            :label="$t('all_blogposts')"
            :to="$localeUrl({ name: 'blog' })"
          />
        </div>
      </div>

      <text-block>
        <p class="font-html-blue testimonial">
          {{ data.page.introTitle }}
        </p>
      </text-block>

      <template v-for="item in items">
        <div
          v-if="item.__typename === 'CallToActionRecord'"
          :key="item.id"
          :id="item.id"
          class="page-blog-post-list__text"
        >
          <blockquote-block
            :title="item.title"
            :title-id="item.titleId"
            :body="item.body"
            :link-label="item.linkLabel"
            :link-url="item.linkUrl"
          />
        </div>

        <code-preview-block
          class="page-blog-post-list--full-width"
          v-if="item.__typename === 'CodePenBlockRecord' && item.url"
          :url="item.url"
          :caption="item.caption"
          :title="item.title"
          :type="item.previewType"
          :key="item.id"
          :id="item.titleId"
        />

        <code-block
          :id="item.id"
          class="page-blog-post-list--full-width"
          v-if="item.__typename === 'CodeBlockRecord' && item.body"
          :language="item.language"
          :content="prismify({ body: item.body, language: item.language })"
          :key="item.id"
        />

        <quote-block
          :id="item.id"
          v-if="item.quote"
          :key="item.id"
          :quote="item.quote"
          :cite="item.author"
        />

        <image-with-caption
          :id="item.id"
          class="page-blog-post-list__image"
          :class="{ 'page-blog-post-list--full-width' : item.fullWidth}"
          v-if="item.__typename === 'ImageRecord' && item.image"
          :key="item.id"
          :image="{
            ...item.image,
            sizes: item.fullWidth
              ? '(min-width: 1440px) 860px, (min-width: 720px) 75vw, 95vw'
              : '(min-width: 1440px) 640px, (min-width: 720px) 65vw, 95vw',
          }"
          :caption="item.caption"
          :caption-position="item.captionPosition"
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
          :caption="item.caption"
        />

        <div
          :id="item.id"
          v-if="item.__typename === 'TextSectionRecord'"
          :key="item.id"
          class="page-blog-post-list__text"
        >
          <component
            v-if="item.title"
            class="page-blog-post-list__title font-html-blue"
            :class="headingLevelClassMap[item.headingLevel || defaultHeadingLevel]"
            :is="`h${item.headingLevel || defaultHeadingLevel}`"
            :id="item.titleId"
          >
            {{ item.title }}
          </component>
          <rich-text-block
            v-if="item.body"
            :text="item.body"
            large-text
          />
        </div>

        <div
          :id="item.id"
          v-if="item.__typename === 'LinkSectionRecord'"
          :key="item.id"
        >
          <app-button
            class="page-blog-post__button"
            :external="item.external"
            :label="item.label"
            :to="item.link"
          />
        </div>
      </template>
    </article>

    <div
      class="page-blog-post__link-container"
      ref="articleEnd"
    >
      <app-link
        class="app-button app-button--secondary body font-bold"
        :to="$localeUrl({ name: 'blog' })"
      >
        &larr; {{ $t('all_blogposts') }}
      </app-link>
    </div>

    <section class="page-blog-post__pivots grid">
      <pivot-list
        v-if="data.page.pivots && data.page.pivots.length"
        :pivots="data.page.pivots"
        :can-have-border-top="false"
        :pivot-narrow="true"
      />
      <div class="page-blog-post__scroll-to">
        <scroll-to direction="up" />
      </div>
    </section>
  </main>
</template>

<script setup>
  definePageMeta({ layout: 'content-page' });

  import slugify from '../../../../lib/slugify';
  import query from './index.query.graphql?raw';
  import prismjs from 'prismjs';
  import('prismjs/components/prism-graphql');
  import('prismjs/components/prism-rust');

  const defaultHeadingLevel = 3;

  const headingLevelClassMap = {
    2: 'h3',
    3: 'h4',
    4: 'h5',
    5: 'h6',
  }

  const runtimeConfig = useRuntimeConfig();

  const { params } = useRoute();
  const { data } = await useFetchContent({
    query,
    variables: {
      slug: params.slug,
      locale: params.language,
    },
  });

  useSeoHead(data.value.page);

  const prismify = ({ body, language }) => (
    prismjs.languages[language]
      ? prismjs.highlight(body, prismjs.languages[language], language)
      : body
  );

  const items = computed(() => {
    return data.value.page.items
      .map((item) => {
        return item.title ? {
          titleId: slugify(item.title),
          ...item
        } : {
          ...item
        }
      })
  })

  const tocItems = computed(() => {
    return items.value.filter(item => item.titleId)
  })
</script>

<style>
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

  .page-blog-post-list__title {
    margin-bottom: var(--spacing-smaller);
  }

  .page-blog-post__aside {
    justify-content: space-between;
    grid-row: 2;
  }

  .page-blog-post__link-container {
    grid-row: 4;
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-blog-post__pivots {
    position: relative;
    grid-column: var(--grid-page);
    grid-row: 5;
    background-color: var(--bg-pastel);
  }

  .page-blog-post__scroll-to {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 55px;
    grid-column-start: -2;
    grid-column-end: -3;
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

  .page-blog-post__archived {
    margin-top: var(--spacing-medium);
    background-color: var(--brand-yellow);
    padding: var(--spacing-large);
  }

  .page-blog-post__archived-button {
    margin-top: var(--spacing-medium);
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
      grid-column-start: 2;
      grid-column-end: 9;
    }

    .page-blog-post__link-container {
      grid-column-start: 4;
      grid-column-end: 48;
    }

    .page-blog-post__scroll-to {
      display: block;
    }

    .page-blog-post__archived {
      margin-top: 0;
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
