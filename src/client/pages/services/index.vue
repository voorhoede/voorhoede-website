<template>
  <main class="page-services grid">
    <page-header
      :title="page.title"
      :text="page.subtitle"
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
  import PageHeader from '~/components/page-header'
  import ServicesList from '~/components/services-list'
  import ContactForm from '~/components/contact-form'
  import RichTextBlock from '~/components/rich-text-block'

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
