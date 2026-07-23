<script setup lang="ts">
import type { BlockRecord } from "./types";
import CaseListBlock from "./CaseListBlock/CaseListBlock.vue";
import GroupingBlock from "./GroupingBlock/GroupingBlock.vue";
import LogoGridBlock from "./LogoGridBlock/LogoGridBlock.vue";
import PageHeaderBlock from "./PageHeaderBlock/PageHeaderBlock.vue";
import PagePartialBlock from "./PagePartialBlock/PagePartialBlock.vue";
import ReachOutBlock from "./ReachOutBlock/ReachOutBlock.vue";
import TeamGalleryBlock from "./TeamGalleryBlock/TeamGalleryBlock.vue";
import TextBlock from "./TextBlock/TextBlock.vue";
import TextImageBlock from "./TextImageBlock/TextImageBlock.vue";

const props = defineProps<{
  block: BlockRecord;
}>();
</script>

<template>
  <CaseListBlock
    v-if="props.block?.__typename === 'CaseListBlockRecord'"
    :data="props.block"
  />
  <GroupingBlock
    v-else-if="props.block?.__typename === 'GroupingBlockRecord'"
    :data="props.block"
  />
  <LogoGridBlock
    v-else-if="props.block?.__typename === 'LogoGridRecord'"
    :data="props.block"
  />
  <PageHeaderBlock
    v-else-if="props.block?.__typename === 'PageHeaderRecord'"
    :data="props.block"
  />
  <PagePartialBlock
    v-else-if="props.block?.__typename === 'PagePartialBlockRecord'"
    :data="props.block"
  />
  <ReachOutBlock
    v-else-if="props.block?.__typename === 'ReachOutBlockRecord'"
    :data="props.block"
  />
  <TeamGalleryBlock
    v-else-if="props.block?.__typename === 'TeamGalleryRecord'"
    :data="props.block"
  />
  <TextBlock
    v-else-if="props.block?.__typename === 'TextBlockRecord'"
    :data="props.block"
  />
  <TextImageBlock
    v-else-if="props.block?.__typename === 'TextImageBlockRecord'"
    :data="props.block"
  />
</template>
