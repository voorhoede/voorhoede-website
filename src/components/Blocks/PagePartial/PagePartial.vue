<template>
  <Blocks v-if="section" :blocks="[section]" />
</template>

<script setup lang="ts">
import { type PagePartialFragment } from "./PagePartial.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { BlockItem } from "./types";

const props = defineProps<{
  data: FragmentOf<typeof PagePartialFragment>;
}>();

const data = readFragment<typeof PagePartialFragment>(props.data);

type SupportedBlockItem = Exclude<
  BlockItem,
  { __typename: "PagePartialBlockRecord" }
>;

const section = computed(() => data.item?.section as SupportedBlockItem);
</script>
