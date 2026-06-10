<script setup lang="ts">
import type { BlockItem } from "./PagePartial/types";
import CaseList from "./CaseList/CaseList.vue";
import DialogueCta from "./DialogueCta/DialogueCta.vue";
import ImageCardGrid from "./ImageCardGrid/ImageCardGrid.vue";
import LogoGrid from "./LogoGrid/LogoGrid.vue";
import PageHeader from "./PageHeader/PageHeader.vue";
import PagePartial from "./PagePartial/PagePartial.vue";
import TextImage from "./TextImage/TextImage.vue";

const props = defineProps<{
  blocks: BlockItem[];
}>();
</script>

<template>
  <div v-for="(block, index) in props.blocks" :key="index" class="grid block">
    <CaseList
      v-if="block?.__typename === 'SectionCaseListRecord'"
      :data="block"
    />
    <DialogueCta
      v-else-if="block?.__typename === 'SectionDialogueCtaRecord'"
      :data="block"
    />
    <ImageCardGrid
      v-else-if="block?.__typename === 'SectionImageCardGridRecord'"
      :data="block"
    />
    <LogoGrid
      v-else-if="block?.__typename === 'SectionLogoGridRecord'"
      :data="block"
    />
    <PageHeader
      v-else-if="block?.__typename === 'SectionHeaderRecord'"
      :data="block"
    />
    <PagePartial
      v-else-if="block?.__typename === 'PagePartialBlockRecord'"
      :data="block"
    />
    <TextImage
      v-else-if="block?.__typename === 'SectionTextImageRecord'"
      :data="block"
    />
  </div>
</template>

<style scoped>
.block:not(:has(.grouping-block)) {
  margin-bottom: var(--spacing-larger);

  @media (min-width: 720px) {
    margin-bottom: var(--spacing-huge);
  }
}
</style>
