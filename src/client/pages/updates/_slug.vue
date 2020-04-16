<template>
  <div class="grid page-update">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />
    <article class="page-update__article">
      <template v-for="item in page.items">
        <div v-if="item.__typename === 'TextSectionRecord'" :key="item.id">
          <h3 v-if="item.title" class="h3 font-html-blue" :id="slugify(item.title)">
            {{ item.title }}
          </h3>
          <rich-text-block v-if="item.body" :text="item.body" large-text />
        </div>
      </template>
    </article>
    <newsletter-form />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import RichTextBlock from '~/components/rich-text-block'
  import PageHeader from '~/components/page-header'
  import NewsletterForm from '~/components/newsletter-form'

  export default {
    components: {
      NewsletterForm,
      RichTextBlock,
      PageHeader,
    },
    asyncData,
    head,
  }
</script>

<style>
  .page-update .page-header,
  .page-update .page-update__article {
    margin-bottom: var(--spacing-large);
  }

  .page-update__article {
    grid-row: 2;
  }

  .page-update__article > *:not(:last-child) {
    margin: 0 0 var(--spacing-large) 0;
  }

  @media (min-width: 720px) {
    .page-update {
      background-color: var(--bg-pastel);
    }

    .page-update__article {
      position: relative;
      grid-column: var(--grid-content);
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }
  }

  @media (min-width: 1100px) {
    .page-update__article {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }

</style>
