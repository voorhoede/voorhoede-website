<template>
  <grouping-block
    v-if="item.section.__typename === 'SectionGroupingRecord'"
    :items="item.section.items"
    :theme="item.section.theme"
    :accent-position="item.section.accentPosition"
  />
  <page-header
    v-if="item.section.__typename === 'SectionHeaderRecord'"
    heading="byline"
    :byline="item.section.title"
    :headline="item.section.subtitle"
    :image="item.section.illustration"
    :fill-screen="item.section.layout === 'full-height'"
    :has-semantic-header="item.section.layout === 'full-height'"
    :is-animated="item.section.style === 'animated'"
    :curly-bracket="item.section.style === 'animated'"
  />
  <image-with-text-block
    v-if="item.section.__typename === 'SectionImageTextRecord'"
    :title="item.section.title"
    :body="item.section.body"
    :image="item.section.image"
    :inverse="item.section.imagePosition === 'right'"
    :background-color="item.section.backgroundColor"
    :paragraph-variant="
      item.section.fontSize === 'small' ? 'body' : 'body-big'
    "
  />
  <interstitial-cta
    v-if="item.section.__typename === 'SectionInterstitialCtaRecord'"
    :cta="item.section.title"
    :buttons="
      item.section.ctas.map((cta) => ({
        label: cta.title,
        to: cta.url || cta.link,
        external: cta.__typename === 'ExternalLinkRecord',
      }))
    "
  />
  <newsletter-form
    v-if="item.section.__typename === 'SectionNewsletterRecord'"
  />
  <image-grid
    v-if="item.section.__typename === 'SectionImageGridRecord'"
    :title="item.section.title"
    :items="item.section.items"
    :background-color="item.section.backgroundColor"
  />
  <logo-grid
    v-if="item.section.__typename === 'SectionLogoGridRecord'"
    :title="item.section.title"
    :logos="item.section.logos"
  />
  <dialogue-cta
    v-if="item.section.__typename === 'SectionDialogueCtaRecord'"
    :variant="item.section.variant"
    :title="item.section.title"
    :body="item.section.body"
    :person="item.section.person"
    :ctas="
      item.section.ctas.map((cta) => ({
        label: cta.title,
        to: cta.url || cta.link,
        external: cta.__typename === 'ExternalLinkRecord',
        style: cta.style,
      }))
    "
  />
  <structured-text-block
    v-if="item.section.__typename === 'SectionStructuredTextRecord'"
    :content="item.section.body"
    :grid-alignment="item.section.gridAlignment"
    :has-toc="item.section.hasToc"
    paragraph-variant="body-big"
  />
  <image-card-grid
    v-if="item.section.__typename === 'SectionImageCardGridRecord'"
    :title="item.section.title"
    :items="item.section.items"
    :background-color="item.section.backgroundColor"
    :card-orientation="item.section.cardOrientation"
  />
  <jobs-list
    v-if="item.section.__typename === 'SectionJobsListRecord'"
    :jobs="item.section.jobs"
  />
  <timeline-block
    v-if="item.section.__typename === 'SectionTimelineRecord'"
    :items="item.section.items"
  />
  <blogs-section
    v-if="item.section.__typename === 'SectionBlogsSectionRecord'"
    :title="item.section.title"
    :items="item.section.items"
    :pinned-items="item.section.pinnedItems"
    :item-size="item.section.itemSize"
  />
  <events-section
    v-if="item.section.__typename === 'SectionEventsSectionRecord'"
    :items="item.section.items"
    :title="item.section.title"
  />
  <team-gallery
    v-if="item.section.__typename === 'SectionTeamGalleryRecord'"
    :team="item.section.persons"
  />
  <responsive-video
    v-if="item.section.__typename === 'SectionVideoRecord'"
    :video="item.section.video"
    :autoplay="item.section.autoplay"
    :loop="item.section.loop"
    :mute="item.section.mute"
    :caption="item.section.caption"
  />
  <cases-list
    v-if="item.section.__typename === 'SectionCaseListRecord'"
    :cases="item.section.cases"
    :max-columns="item.section.columns"
    :title="item.section.title"
  />
  <text-image-block
    v-if="item.section.__typename === 'SectionTextImageRecord'"
    :text="item.section.text"
    :layout="item.section.layout"
    :image="item.section.image"
  />
  <cta-block
    v-if="item.section.__typename === 'CallToActionRecord'"
    :id="item.section.id"
    :body="item.section.body"
    :title="item.section.title"
    :item="item.section"
    :person="item.section.person"
    :secondary-link-label="item.section.secondaryLinkLabel"
    :secondary-link-url="item.section.secondaryLinkUrl"
    :secondary-link-is-external="item.section.secondaryLinkIsExternal"
  />
</template>

<script setup lang="ts">
interface PagePartialSection {
  __typename: string;
  [key: string]: any;
}

const props = defineProps<{
  item: {
    id: string;
    title: string;
    section: PagePartialSection;
  };
}>();

const { item } = toRefs(props);
</script>
