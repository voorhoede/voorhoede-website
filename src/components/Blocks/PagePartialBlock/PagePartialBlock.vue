<template>
  <BlockItem v-if="section" :block="section" />
</template>

<script setup lang="ts">
import type { PagePartialBlockFragment } from "./PagePartialBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { BlockRecord } from "../types";
import BlockItem from "../BlockItem.vue";

const props = defineProps<{
  data: FragmentOf<typeof PagePartialBlockFragment>;
}>();

const data = readFragment<typeof PagePartialBlockFragment>(props.data);

type SupportedBlockItem = Exclude<
  BlockRecord,
  { __typename: "PagePartialBlockRecord" }
>;

const section = computed(() => data.item?.section as SupportedBlockItem);
</script>
