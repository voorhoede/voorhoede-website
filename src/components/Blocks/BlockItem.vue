<script setup lang="ts">
import type { BlockRecord } from "./types";
import BlogsSection from "./BlogsSection/BlogsSection.vue";
import CaseList from "./CaseList/CaseList.vue";
import CtaBlock from "./CtaBlock/CtaBlock.vue";
import DialogueCta from "./DialogueCta/DialogueCta.vue";
import EventsSection from "./EventsSection/EventsSection.vue";
import GlossarySection from "./GlossarySection/GlossarySection.vue";
import Grouping from "./Grouping/Grouping.vue";
import ImageCardGrid from "./ImageCardGrid/ImageCardGrid.vue";
import ImageGrid from "./ImageGrid/ImageGrid.vue";
import ImageWithText from "./ImageWithText/ImageWithText.vue";
import InterstitialCta from "./InterstitialCta/InterstitialCta.vue";
import JobsList from "./JobsList/JobsList.vue";
import LogoGrid from "./LogoGrid/LogoGrid.vue";
import NewsletterForm from "./NewsletterForm/NewsletterForm.vue";
import PageHeader from "./PageHeader/PageHeader.vue";
import PagePartial from "./PagePartial/PagePartial.vue";
import ResponsiveVideo from "./ResponsiveVideo/ResponsiveVideo.vue";
import StructuredTextBlock from "./StructuredTextBlock/StructuredTextBlock.vue";
import TeamGallery from "./TeamGallery/TeamGallery.vue";
import TextImage from "./TextImage/TextImage.vue";
import TimelineBlock from "./TimelineBlock/TimelineBlock.vue";

const props = defineProps<{
  block: BlockRecord;
}>();
</script>

<template>
  <CaseList
    v-if="props.block?.__typename === 'SectionCaseListRecord'"
    :data="props.block"
  />
  <DialogueCta
    v-else-if="props.block?.__typename === 'SectionDialogueCtaRecord'"
    :data="props.block"
  />
  <Grouping
    v-else-if="props.block?.__typename === 'SectionGroupingRecord'"
    :data="props.block"
  />
  <ImageCardGrid
    v-else-if="props.block?.__typename === 'SectionImageCardGridRecord'"
    :data="props.block"
  />
  <LogoGrid
    v-else-if="props.block?.__typename === 'SectionLogoGridRecord'"
    :data="props.block"
  />
  <PageHeader
    v-else-if="props.block?.__typename === 'SectionHeaderRecord'"
    :data="props.block"
  />
  <PagePartial
    v-else-if="props.block?.__typename === 'PagePartialBlockRecord'"
    :data="props.block"
  />
  <TextImage
    v-else-if="props.block?.__typename === 'SectionTextImageRecord'"
    :data="props.block"
  />
  <BlogsSection
    v-else-if="props.block?.__typename === 'SectionBlogsSectionRecord'"
    :data="props.block"
  />
  <EventsSection
    v-else-if="props.block?.__typename === 'SectionEventsSectionRecord'"
    :data="props.block"
  />
  <GlossarySection
    v-else-if="props.block?.__typename === 'SectionGlossaryRecord'"
    :data="props.block"
  />
  <JobsList
    v-else-if="props.block?.__typename === 'SectionJobsListRecord'"
    :data="props.block"
  />
  <ResponsiveVideo
    v-else-if="props.block?.__typename === 'SectionVideoRecord'"
    :data="props.block"
  />
  <TeamGallery
    v-else-if="props.block?.__typename === 'SectionTeamGalleryRecord'"
    :data="props.block"
  />
  <TimelineBlock
    v-else-if="props.block?.__typename === 'SectionTimelineRecord'"
    :data="props.block"
  />
  <ImageGrid
    v-else-if="props.block?.__typename === 'SectionImageGridRecord'"
    :data="props.block"
  />
  <ImageWithText
    v-else-if="props.block?.__typename === 'SectionImageTextRecord'"
    :data="props.block"
  />
  <InterstitialCta
    v-else-if="props.block?.__typename === 'SectionInterstitialCtaRecord'"
    :data="props.block"
  />
  <NewsletterForm
    v-else-if="props.block?.__typename === 'SectionNewsletterRecord'"
    :data="props.block"
  />
  <StructuredTextBlock
    v-else-if="props.block?.__typename === 'SectionStructuredTextRecord'"
    :data="props.block"
  />
  <CtaBlock
    v-else-if="props.block?.__typename === 'CallToActionRecord'"
    :data="props.block"
  />
</template>
