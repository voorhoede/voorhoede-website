<template>
  <ResponsiveVideo
    v-if="data.video"
    :video="data.video as VideoProp"
    :autoplay="data.autoplay"
    :loop="data.loop"
    :mute="data.mute"
    :caption="data.caption ?? undefined"
  />
</template>

<script setup lang="ts">
import type { ResponsiveVideoBlockFragment } from "./ResponsiveVideoBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

interface VideoProp {
  provider: "youtube" | "vimeo";
  providerUid: string;
  title: string;
  url: string;
  width: number;
  height: number;
  thumbnailUrl: string;
}

const props = defineProps<{
  data: FragmentOf<typeof ResponsiveVideoBlockFragment>;
}>();

const data = readFragment<typeof ResponsiveVideoBlockFragment>(props.data);
</script>
