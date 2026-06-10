<template>
  <BlockItem v-if="section" :block="section" />
</template>

<script setup lang="ts">
import { type PagePartialFragment } from "./PagePartial.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { BlockRecord } from "../types";
import BlockItem from "../BlockItem.vue";

const props = defineProps<{
  data: FragmentOf<typeof PagePartialFragment>;
}>();

const data = readFragment<typeof PagePartialFragment>(props.data);

type SupportedBlockItem = Exclude<
  BlockRecord,
  { __typename: "PagePartialBlockRecord" }
>;

const section = computed(() => data.item?.section as SupportedBlockItem);
</script>
