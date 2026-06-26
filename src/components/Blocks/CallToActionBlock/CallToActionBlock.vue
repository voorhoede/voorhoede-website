<template>
  <CtaBlock :item="data" />
</template>

<script setup lang="ts">
import type { CallToActionBlockFragment } from "./CallToActionBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof CallToActionBlockFragment>;
}>();

const data = readFragment<typeof CallToActionBlockFragment>(props.data);
</script>
