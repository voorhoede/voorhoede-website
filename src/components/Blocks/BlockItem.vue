<script setup lang="ts">
import type { BlockRecord } from "./types";
import BlogsSectionBlock from "./BlogsSectionBlock/BlogsSectionBlock.vue";
import CallToActionBlock from "./CallToActionBlock/CallToActionBlock.vue";
import CaseListBlock from "./CaseListBlock/CaseListBlock.vue";
import DialogueCtaBlock from "./DialogueCtaBlock/DialogueCtaBlock.vue";
import EventsSectionBlock from "./EventsSectionBlock/EventsSectionBlock.vue";
import GlossarySectionBlock from "./GlossarySectionBlock/GlossarySectionBlock.vue";
import GroupingBlock from "./GroupingBlock/GroupingBlock.vue";
import ImageCardGridBlock from "./ImageCardGridBlock/ImageCardGridBlock.vue";
import ImageGridBlock from "./ImageGridBlock/ImageGridBlock.vue";
import ImageTextBlock from "./ImageTextBlock/ImageTextBlock.vue";
import InterstitialCtaBlock from "./InterstitialCtaBlock/InterstitialCtaBlock.vue";
import JobsListBlock from "./JobsListBlock/JobsListBlock.vue";
import LogoGridBlock from "./LogoGridBlock/LogoGridBlock.vue";
import NewsletterBlock from "./NewsletterBlock/NewsletterBlock.vue";
import PageHeaderBlock from "./PageHeaderBlock/PageHeaderBlock.vue";
import PagePartialBlock from "./PagePartialBlock/PagePartialBlock.vue";
import ResponsiveVideoBlock from "./ResponsiveVideoBlock/ResponsiveVideoBlock.vue";
import StructuredTextSectionBlock from "./StructuredTextSectionBlock/StructuredTextSectionBlock.vue";
import TeamGalleryBlock from "./TeamGalleryBlock/TeamGalleryBlock.vue";
import TextBlock from "./TextBlock/TextBlock.vue";
import TextImageBlock from "./TextImageBlock/TextImageBlock.vue";
import TimelineBlock from "./TimelineBlock/TimelineBlock.vue";

const props = defineProps<{
  block: BlockRecord;
}>();
</script>

<template>
  <BlogsSectionBlock
    v-if="props.block?.__typename === 'SectionBlogsSectionRecord'"
    :data="props.block"
  />
  <CallToActionBlock
    v-else-if="props.block?.__typename === 'CallToActionRecord'"
    :data="props.block"
  />
  <CaseListBlock
    v-else-if="props.block?.__typename === 'SectionCaseListRecord'"
    :data="props.block"
  />
  <DialogueCtaBlock
    v-else-if="props.block?.__typename === 'SectionDialogueCtaRecord'"
    :data="props.block"
  />
  <EventsSectionBlock
    v-else-if="props.block?.__typename === 'SectionEventsSectionRecord'"
    :data="props.block"
  />
  <GlossarySectionBlock
    v-else-if="props.block?.__typename === 'SectionGlossaryRecord'"
    :data="props.block"
  />
  <GroupingBlock
    v-else-if="props.block?.__typename === 'SectionGroupingRecord'"
    :data="props.block"
  />
  <ImageCardGridBlock
    v-else-if="props.block?.__typename === 'SectionImageCardGridRecord'"
    :data="props.block"
  />
  <ImageGridBlock
    v-else-if="props.block?.__typename === 'SectionImageGridRecord'"
    :data="props.block"
  />
  <ImageTextBlock
    v-else-if="props.block?.__typename === 'SectionImageTextRecord'"
    :data="props.block"
  />
  <InterstitialCtaBlock
    v-else-if="props.block?.__typename === 'SectionInterstitialCtaRecord'"
    :data="props.block"
  />
  <JobsListBlock
    v-else-if="props.block?.__typename === 'SectionJobsListRecord'"
    :data="props.block"
  />
  <LogoGridBlock
    v-else-if="props.block?.__typename === 'SectionLogoGridRecord'"
    :data="props.block"
  />
  <NewsletterBlock
    v-else-if="props.block?.__typename === 'SectionNewsletterRecord'"
    :data="props.block"
  />
  <PageHeaderBlock
    v-else-if="props.block?.__typename === 'SectionHeaderRecord'"
    :data="props.block"
  />
  <PagePartialBlock
    v-else-if="props.block?.__typename === 'PagePartialBlockRecord'"
    :data="props.block"
  />
  <ResponsiveVideoBlock
    v-else-if="props.block?.__typename === 'SectionVideoRecord'"
    :data="props.block"
  />
  <StructuredTextSectionBlock
    v-else-if="props.block?.__typename === 'SectionStructuredTextRecord'"
    :data="props.block"
  />
  <TeamGalleryBlock
    v-else-if="props.block?.__typename === 'SectionTeamGalleryRecord'"
    :data="props.block"
  />
  <TextBlock
    v-else-if="props.block?.__typename === 'TextBlockRecord'"
    :data="props.block"
  />
  <TextImageBlock
    v-else-if="props.block?.__typename === 'SectionTextImageRecord'"
    :data="props.block"
  />
  <TimelineBlock
    v-else-if="props.block?.__typename === 'SectionTimelineRecord'"
    :data="props.block"
  />
</template>
