<template>
  <Blocks v-if="blocks.length" :blocks="blocks" />
</template>

<script setup lang="ts">
import type { PagePartialBlockFragment } from "./PagePartialBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { BlockRecord } from "../types";
import Blocks from "../Blocks.vue";

const props = defineProps<{
  data: FragmentOf<typeof PagePartialBlockFragment>;
}>();

const data = readFragment<typeof PagePartialBlockFragment>(props.data);

type SupportedBlockItem = Exclude<
  BlockRecord,
  { __typename: "PagePartialBlockRecord" }
>;

const blocks = computed(
  () => (data.item?.blocks ?? []) as SupportedBlockItem[],
);
</script>
