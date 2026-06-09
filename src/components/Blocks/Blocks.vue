<script setup lang="ts">
import type { CaseListFragment } from "./CaseList/CaseList.query";
import CaseList from "./CaseList/CaseList.vue";
import type { DialogueCtaFragment } from "./DialogueCta/DialogueCta.query";
import DialogueCta from "./DialogueCta/DialogueCta.vue";
import type { ImageCardGridFragment } from "./ImageCardGrid/ImageCardGrid.query";
import ImageCardGrid from "./ImageCardGrid/ImageCardGrid.vue";
import type { LogoGridFragment } from "./LogoGrid/LogoGrid.query";
import LogoGrid from "./LogoGrid/LogoGrid.vue";
import type { PageHeaderFragment } from "./PageHeader/PageHeader.query";
import PageHeader from "./PageHeader/PageHeader.vue";
import type { TextImageFragment } from "./TextImage/TextImage.query";
import TextImage from "./TextImage/TextImage.vue";

const props = defineProps<{
  blocks: Array<
    | (FragmentOf<typeof CaseListFragment> & {
        __typename: "SectionCaseListRecord";
      })
    | (FragmentOf<typeof DialogueCtaFragment> & {
        __typename: "SectionDialogueCtaRecord";
      })
    | (FragmentOf<typeof ImageCardGridFragment> & {
        __typename: "SectionImageCardGridRecord";
      })
    | (FragmentOf<typeof LogoGridFragment> & {
        __typename: "SectionLogoGridRecord";
      })
    | (FragmentOf<typeof PageHeaderFragment> & {
        __typename: "SectionHeaderRecord";
      })
    | (FragmentOf<typeof TextImageFragment> & {
        __typename: "SectionTextImageRecord";
      })
  >;
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
