<script setup lang="ts">
import type { BlockRecord } from "./types";
import CaseList from "./CaseList/CaseList.vue";
import DialogueCta from "./DialogueCta/DialogueCta.vue";
import ImageCardGrid from "./ImageCardGrid/ImageCardGrid.vue";
import LogoGrid from "./LogoGrid/LogoGrid.vue";
import PageHeader from "./PageHeader/PageHeader.vue";
import PagePartial from "./PagePartial/PagePartial.vue";
import TextImage from "./TextImage/TextImage.vue";

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
</template>
