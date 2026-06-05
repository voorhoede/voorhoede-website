<script setup lang="ts">
import type { CaseListFragment } from "./CaseList/CaseList.query";
import CaseList from "./CaseList/CaseList.vue";
import type { DialogueCtaFragment } from "./DialogueCta/DialogueCta.query";
import DialogueCta from "./DialogueCta/DialogueCta.vue";
import type { LogoGridFragment } from "./LogoGrid/LogoGrid.query";
import LogoGrid from "./LogoGrid/LogoGrid.vue";

const props = defineProps<{
  blocks: Array<
    | (FragmentOf<typeof LogoGridFragment> & {
        __typename: "SectionLogoGridRecord";
      })
    | (FragmentOf<typeof CaseListFragment> & {
        __typename: "SectionCaseListRecord";
      })
    | (FragmentOf<typeof DialogueCtaFragment> & {
        __typename: "SectionDialogueCtaRecord";
      })
  >;
}>();
</script>

<template>
  <div v-for="(block, index) in props.blocks" :key="index">
    <LogoGrid
      v-if="block?.__typename === 'SectionLogoGridRecord'"
      :data="block"
    />
    <CaseList
      v-else-if="block?.__typename === 'SectionCaseListRecord'"
      :data="block"
    />
    <DialogueCta
      v-else-if="block?.__typename === 'SectionDialogueCtaRecord'"
      :data="block"
    />
  </div>
</template>
