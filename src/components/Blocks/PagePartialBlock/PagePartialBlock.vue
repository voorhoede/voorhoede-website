<template>
  <Blocks v-if="blocks.length" :blocks="blocks" />
</template>

<script setup lang="ts">
import type { PagePartialBlockFragment } from "./PagePartialBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { BlockRecord } from "../types";
import type { BackgroundColorValue } from "~/types/styling";
import Blocks from "../Blocks.vue";

const props = defineProps<{
  data: FragmentOf<typeof PagePartialBlockFragment>;
}>();

const data = readFragment<typeof PagePartialBlockFragment>(props.data);

type SupportedBlockItem = Exclude<
  BlockRecord,
  { __typename: "PagePartialBlockRecord" }
> & { backgroundColor?: BackgroundColorValue | null };

const blocks = computed(
  () =>
    (data.item?.blocks ?? []).map((block) => ({
      ...block,
      backgroundColor: data.theme as BackgroundColorValue,
    })) as SupportedBlockItem[],
);
</script>
