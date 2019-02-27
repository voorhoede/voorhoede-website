<template>
  <main class="page-services grid">
    <page-header
      :small-text="page.title"
      :large-text="page.subtitle"
      heading="context"
      :image="page.headerIllustration" />
    <services-list
      :services="page.services"
      :cta="page.serviceCtaLabel" />
    <rich-text-block
      class="services-text"
      :text="page.smallServices" />
    <contact-form class="grid" :title="$t('lets_discuss')" />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import { PageHeader, ServicesList, ContactForm, RichTextBlock } from '~/components'

  export default {
    components: { ServicesList, ContactForm, PageHeader, RichTextBlock },
    asyncData,
    head
  }
</script>

<style>

  .page-services .page-header {
    grid-column: var(--grid-page);
  }

  .page-services > * {
    margin-bottom: var(--spacing-big);
  }

  .page-services .services-list {
    grid-row: 2;
    margin-bottom: var(--spacing-larger);
  }

  .page-services .services-text {
    grid-row: 3;
  }

  .page-services .contact-form {
    grid-row: 4;
  }

  @media (min-width: 720px) {
    .page-services .services-text {
      text-align: center;
      max-width: var(--small-services-width);
    }
  }

  @media (min-width: 1100px) {
    .page-services > * {
      margin-bottom: var(--spacing-bigger);
    }

    .page-services .services-list {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }
</style>
