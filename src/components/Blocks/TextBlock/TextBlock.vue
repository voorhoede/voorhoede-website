<template>
  <div
    :class="{
      [`text-block`]: true,
      ['body-big']: true,
    }"
  >
    <StructuredText :data="data.text" />
  </div>
</template>

<script setup lang="ts">
import { type TextBlockFragment } from "./TextBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";

const props = defineProps<{
  data: FragmentOf<typeof TextBlockFragment>;
}>();

const data = readFragment<typeof TextBlockFragment>(props.data);
</script>
