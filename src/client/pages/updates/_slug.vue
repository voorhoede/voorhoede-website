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
    <section
      v-if="page.pivots && page.pivots.length"
      class="page-update__pivots grid">
      <pivot-section
        :pivots="page.pivots"
        :pivot-border="false"
        :pivot-narrow="true"
      />
    </section>
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

  .page-update__pivots {
    grid-column: var(--grid-page);
    background-color: var(--bg-pastel);
    margin-bottom: 0;
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

    .page-update__pivots {
      margin-bottom: var(--spacing-big);
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
  }

</style>
