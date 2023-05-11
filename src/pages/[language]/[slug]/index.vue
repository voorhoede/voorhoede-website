<template>
  <div class="landing-page grid">
    <template
      v-for="(section, index) in data.page.sections"
      :key="index"
    >
      <page-header
        v-if="section.__typename === 'SectionHeaderRecord'"
        heading="byline"
        :byline="section.title"
        :headline="section.subtitle"
        :image="section.illustration"
      />
      <image-with-text-block
        v-if="section.__typename === 'SectionImageTextRecord'"
        :title="section.title"
        :body="section.body"
        :image="section.image"
        :inverse="section.imagePosition === 'right'"
      />
      <interstitial-cta
        v-if="section.__typename === 'SectionInterstitialCtaRecord'"
        :cta="section.title"
        :buttons="section.ctas.map((cta) => ({
          label: cta.title,
          to: cta.url || cta.link,
          external: cta.__typename === 'ExternalLinkRecord',
        }))"
      />
      <newsletter-form
        v-if="section.__typename === 'SectionNewsletterRecord'"
      />
      <image-grid
        v-if="section.__typename === 'SectionImageGridRecord'"
        :title="section.title"
        :items="section.items"
      />
      <logo-grid
        v-if="section.__typename === 'SectionLogoGridRecord'"
        :title="section.title"
        :logos="section.logos"
      />
      <dialogue-cta
        v-if="section.__typename === 'SectionDialogueCtaRecord'"
        :variant="section.variant"
        :title="section.title"
        :body="section.body"
        :person="section.person"
        :ctas="section.ctas.map((cta) => ({
          label: cta.title,
          to: cta.url || cta.link,
          external: cta.__typename === 'ExternalLinkRecord',
        }))"
      />
      <structured-text-block
        v-if="section.__typename === 'SectionStructuredTextRecord'"
        :content="section.body"
        :grid-alignment="section.gridAlignment"
        paragraph-variant="body-big"
      />
      <image-card-grid
        v-if="section.__typename === 'SectionImageCardGridRecord'"
        :title="section.title"
        :items="section.items"
      />
      <jobs-list
        v-if="section.__typename === 'SectionJobsListRecord'"
        :jobs="section.jobs"
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
