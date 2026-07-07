<template>
  <InterstitialCta :cta="data.title" :buttons="buttons" />
</template>

<script setup lang="ts">
import type { InterstitialCtaBlockFragment } from "./InterstitialCtaBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

const props = defineProps<{
  data: FragmentOf<typeof InterstitialCtaBlockFragment>;
}>();

const data = readFragment<typeof InterstitialCtaBlockFragment>(props.data);

const buttons = computed(() =>
  data.ctas.map((cta) => {
    const link = readFragment<typeof LinkToRecordFragment>(cta);
    if (link.__typename === "ExternalLinkRecord") {
      return { label: link.title, to: link.url, external: true };
    }
    if (link.__typename === "InternalLinkRecord") {
      return { label: link.title, to: useDatoNuxtRoute(link.link), external: false };
    }
    return { label: "", to: "", external: false };
  }),
);
</script>
