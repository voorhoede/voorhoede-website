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
    <div class="page-update__cta grid">
      <pivot-section
        v-if="pivots && pivots.length"
        class="page-update__pivot-section"
        :pivot="pivots[0]"
      />
    </div>
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import PageHeader from '~/components/page-header'
  import PivotSection from '~/components/pivot-section'
  import RichTextBlock from '~/components/rich-text-block'

  export default {
    components: {
      PageHeader,
      PivotSection,
      RichTextBlock,
    },
    asyncData,
    head,
  }
</script>

<style>
  .page-update > * {
    margin-bottom: var(--spacing-big);
  }

  .page-update__article {
    grid-row: 2;
  }

  .page-update__article > *:not(:last-child) {
    margin: 0 0 var(--spacing-large) 0;
  }

  .page-update__cta {
    grid-column: var(--grid-page);
    grid-row: 3;
    background-color: var(--bg-pastel);
  }

  .page-update__cta .pivot-section {
    border: none;
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

    .page-updates__pivot-section {
      grid-column-end: 46;
      grid-column-start: 8;
    }
  }

  @media (min-width: 1100px) {
    .page-update > * {
      margin-bottom: var(--spacing-bigger);
    }

    .page-update__article {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-big) var(--spacing-bigger);
    }

    .page-updates__pivot-section {
      grid-column-end: 38;
      grid-column-start: 14;
    }
  }

</style>
