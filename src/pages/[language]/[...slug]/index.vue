<template>
  <div
    class="landing-page"
  >
    <h1 class="sr-only">
      {{ data.page.title }}
    </h1>
    <div
      v-for="(section, index) in data.page.sections"
      class="grid landing-page__section"
      :class="{
        'landing-page__section--pastel-background': hasPastelBackground(section),
      }"
      :key="index"
    >
      <page-header
        v-if="section.__typename === 'SectionHeaderRecord'"
        heading="byline"
        :byline="section.title"
        :headline="section.subtitle"
        :image="section.illustration"
        :has-semantic-header="false"
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
        :has-toc="section.hasToc"
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
      <timeline-block
        v-if="section.__typename === 'SectionTimelineRecord'"
        :items="section.items"
      />
      <blogs-section
        v-if="section.__typename === 'SectionBlogsSectionRecord'"
        :title="section.title"
        :items="section.items"
        :pinned-items="section.pinnedItems"
        :item-size="section.itemSize"
      />
      <events-section
        v-if="section.__typename === 'SectionEventsSectionRecord'"
        :items="section.items"
        :title="section.title"
      />
    </div>
  </div>
</template>

<script setup>
  import query from './index.query.graphql?raw';

  const { params } = useRoute();
  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
      slug: params.slug
        // Don't include empty string fragments caused by leading or trailing slashes
        .filter(Boolean)
        .join('/'),
    },
  });

  useSeoHead(data.value.page);

  function hasPastelBackground(section) {
    return [
      'SectionHeaderRecord',
    ].includes(section.__typename) || (
      section.backgroundColor === BackgroundColor.PastelYellow
    )
  }
</script>

<style>
  .landing-page__section + .landing-page__section {
    padding-top: var(--spacing-big);
  }

  .landing-page__section--pastel-background {
    padding-bottom: var(--spacing-big);
    background-color: var(--bg-pastel);
  }

  .landing-page__section:not(.landing-page__section--pastel-background) + .landing-page__section--pastel-background {
    margin-top: var(--spacing-big);
  }
</style>
