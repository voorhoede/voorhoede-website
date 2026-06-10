<template>
  <Blocks v-if="section" :blocks="[section]" />
</template>

<script setup lang="ts">
import { type PagePartialFragment } from "./PagePartial.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import Blocks from "../Blocks.vue";

const props = defineProps<{
  data: FragmentOf<typeof PagePartialFragment>;
}>();

const data = readFragment<typeof PagePartialFragment>(props.data);

// `section` is a single masked block. Its field type is the full section union,
// so gql.tada widens the members the fragment doesn't select to `{ __typename }`
// only; cast to the block type `Blocks` accepts (CaseList/DialogueCta/LogoGrid
// are the members actually spread, so this is sound at runtime).
type BlockItem = InstanceType<typeof Blocks>["$props"]["blocks"][number];

const section = computed(() => data.item?.section as BlockItem | undefined);
</script>
