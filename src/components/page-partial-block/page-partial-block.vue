<template>
  <grouping-block
    v-if="partial.section.__typename === 'SectionGroupingRecord'"
    :items="partial.section.items"
    :theme="partial.section.theme"
    :accent-position="partial.section.accentPosition"
  />
  <page-header
    v-if="partial.section.__typename === 'SectionHeaderRecord'"
    heading="byline"
    :byline="partial.section.title"
    :headline="partial.section.subtitle"
    :image="partial.section.illustration"
    :fill-screen="partial.section.layout === 'full-height'"
    :has-semantic-header="partial.section.layout === 'full-height'"
    :is-animated="partial.section.style === 'animated'"
    :curly-bracket="partial.section.style === 'animated'"
  />
  <image-with-text-block
    v-if="partial.section.__typename === 'SectionImageTextRecord'"
    :title="partial.section.title"
    :body="partial.section.body"
    :image="partial.section.image"
    :inverse="partial.section.imagePosition === 'right'"
    :background-color="partial.section.backgroundColor"
    :paragraph-variant="
      partial.section.fontSize === 'small' ? 'body' : 'body-big'
    "
  />
  <interstitial-cta
    v-if="partial.section.__typename === 'SectionInterstitialCtaRecord'"
    :cta="partial.section.title"
    :buttons="
      partial.section.ctas.map((cta) => ({
        label: cta.title,
        to: cta.url || cta.link,
        external: cta.__typename === 'ExternalLinkRecord',
      }))
    "
  />
  <newsletter-form
    v-if="partial.section.__typename === 'SectionNewsletterRecord'"
  />
  <image-grid
    v-if="partial.section.__typename === 'SectionImageGridRecord'"
    :title="partial.section.title"
    :items="partial.section.items"
    :background-color="partial.section.backgroundColor"
  />
  <logo-grid
    v-if="partial.section.__typename === 'SectionLogoGridRecord'"
    :title="partial.section.title"
    :logos="partial.section.logos"
  />
  <dialogue-cta
    v-if="partial.section.__typename === 'SectionDialogueCtaRecord'"
    :variant="partial.section.variant"
    :title="partial.section.title"
    :body="partial.section.body"
    :person="partial.section.person"
    :ctas="
      partial.section.ctas.map((cta) => ({
        label: cta.title,
        to: cta.url || cta.link,
        external: cta.__typename === 'ExternalLinkRecord',
        style: cta.style,
      }))
    "
  />
  <structured-text-block
    v-if="partial.section.__typename === 'SectionStructuredTextRecord'"
    :content="partial.section.body"
    :grid-alignment="partial.section.gridAlignment"
    :has-toc="partial.section.hasToc"
    paragraph-variant="body-big"
  />
  <image-card-grid
    v-if="partial.section.__typename === 'SectionImageCardGridRecord'"
    :title="partial.section.title"
    :items="partial.section.items"
    :background-color="partial.section.backgroundColor"
    :card-orientation="partial.section.cardOrientation"
  />
  <jobs-list
    v-if="partial.section.__typename === 'SectionJobsListRecord'"
    :jobs="partial.section.jobs"
  />
  <timeline-block
    v-if="partial.section.__typename === 'SectionTimelineRecord'"
    :items="partial.section.items"
  />
  <blogs-section
    v-if="partial.section.__typename === 'SectionBlogsSectionRecord'"
    :title="partial.section.title"
    :items="partial.section.items"
    :pinned-items="partial.section.pinnedItems"
    :item-size="partial.section.itemSize"
  />
  <events-section
    v-if="partial.section.__typename === 'SectionEventsSectionRecord'"
    :items="partial.section.items"
    :title="partial.section.title"
  />
  <team-gallery
    v-if="partial.section.__typename === 'SectionTeamGalleryRecord'"
    :team="partial.section.persons"
  />
  <responsive-video
    v-if="partial.section.__typename === 'SectionVideoRecord'"
    :video="partial.section.video"
    :autoplay="partial.section.autoplay"
    :loop="partial.section.loop"
    :mute="partial.section.mute"
    :caption="partial.section.caption"
  />
  <cases-list
    v-if="partial.section.__typename === 'SectionCaseListRecord'"
    :cases="partial.section.cases"
    :max-columns="partial.section.columns"
    :title="partial.section.title"
  />
  <text-image-block
    v-if="partial.section.__typename === 'SectionTextImageRecord'"
    :text="partial.section.text"
    :layout="partial.section.layout"
    :image="partial.section.image"
  />
</template>

<script setup lang="ts">
import query from "./page-partial-block.query.graphql?raw";

const props = defineProps<{
  item: { id: string };
}>();

const route = useRoute();

const { data } = await useFetchContent({
  key: `page-partial-${props.item.id}`,
  query,
  variables: {
    locale: route.params.language,
    id: props.item.id,
  },
});

const partial = computed(() => data.value?.pagePartial);
</script>
