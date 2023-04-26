<template>
  <div class="landing-page grid">
    <template v-for="(section, index) in data.page.sections">
      <page-header
        v-if="section.__typename === 'SectionHeaderRecord'"
        :key="index"
        heading="byline"
        :byline="section.title"
        :headline="section.subtitle"
        :image="section.illustration"
      />
      <image-with-text-block
        v-if="section.__typename === 'SectionImageTextRecord'"
        :key="index"
        :title="section.title"
        :body="section.body"
        :image="section.image"
        :inverse="section.imagePosition === 'right'"
      />
      <interstitial-cta
        v-if="section.__typename === 'SectionInterstitialCtaRecord'"
        :key="index"
        :cta="section.title"
        :buttons="section.ctas.map((cta) => ({
          label: cta.title,
          to: cta.url || cta.link,
          external: cta.__typename === 'ExternalLinkRecord',
        }))"
      />
      <newsletter-form
        v-if="section.__typename === 'SectionNewsletterRecord'"
        :key="index"
      />
      <image-grid
        v-if="section.__typename === 'SectionImageGridRecord'"
        :key="index"
        :title="section.title"
        :items="section.items"
      />
      <logo-grid
        v-if="section.__typename === 'SectionLogoGridRecord'"
        :key="index"
        :title="section.title"
        :logos="section.logos"
      />
      <structured-text-block
        v-if="section.__typename === 'SectionStructuredTextRecord'"
        :key="index"
        :content="section.body"
        :grid-alignment="section.gridAlignment"
      />
    </template>
  </div>
</template>

<script setup>
  import query from './index.query.graphql?raw';

  const { params } = useRoute();
  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
      slug: params.slug,
    },
  });

  useSeoHead(data.value.page);
</script>

<style>
  .landing-page {
    background: var(--bg-pastel);
  }

  .landing-page > * {
    margin-bottom: var(--spacing-big);
  }
</style>
