<template>
  <InterstitialCta :cta="data.title" :buttons="buttons" />
</template>

<script setup lang="ts">
import type { InterstitialCtaBlockFragment } from "./InterstitialCtaBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { LinkFragment } from "~/components/Core/AppLink/AppLink.query";

const props = defineProps<{
  data: FragmentOf<typeof InterstitialCtaBlockFragment>;
}>();

const data = readFragment<typeof InterstitialCtaBlockFragment>(props.data);

const buttons = computed(() =>
  data.ctas.map((cta) => {
    const link = readFragment<typeof LinkFragment>(cta);
    const isExternal = link.__typename === "ExternalLinkRecord";
    return {
      label: link.title,
      to: isExternal ? link.url : useDatoNuxtRoute(link.link),
      external: isExternal,
    };
  }),
);
</script>
