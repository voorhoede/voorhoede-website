<script setup lang="ts">
import type { BlockRecord } from "./types";
import CaseListBlock from "./CaseListBlock/CaseListBlock.vue";
import DialogueCtaBlock from "./DialogueCtaBlock/DialogueCtaBlock.vue";
import GroupingBlock from "./GroupingBlock/GroupingBlock.vue";
import ImageCardGridBlock from "./ImageCardGridBlock/ImageCardGridBlock.vue";
import JobsListBlock from "./JobsListBlock/JobsListBlock.vue";
import LogoGridBlock from "./LogoGridBlock/LogoGridBlock.vue";
import PageHeaderBlock from "./PageHeaderBlock/PageHeaderBlock.vue";
import PagePartialBlock from "./PagePartialBlock/PagePartialBlock.vue";
import TextImageBlock from "./TextImageBlock/TextImageBlock.vue";
import TimelineBlock from "./TimelineBlock/TimelineBlock.vue";

const props = defineProps<{
  block: BlockRecord;
}>();
</script>

<template>
  <CaseListBlock
    v-if="props.block?.__typename === 'SectionCaseListRecord'"
    :data="props.block"
  />
  <DialogueCtaBlock
    v-else-if="props.block?.__typename === 'SectionDialogueCtaRecord'"
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
  <JobsListBlock
    v-else-if="props.block?.__typename === 'SectionJobsListRecord'"
    :data="props.block"
  />
  <LogoGridBlock
    v-else-if="props.block?.__typename === 'SectionLogoGridRecord'"
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
  <TextImageBlock
    v-else-if="props.block?.__typename === 'SectionTextImageRecord'"
    :data="props.block"
  />
  <TimelineBlock
    v-else-if="props.block?.__typename === 'SectionTimelineRecord'"
    :data="props.block"
  />
</template>
