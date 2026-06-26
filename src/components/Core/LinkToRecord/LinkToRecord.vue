<template>
  <template v-if="resolvedLink">
    <a
      v-if="resolvedLink.external"
      v-bind="$attrs"
      :class="['app-button', 'body', variantClass]"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      @click="trackExternalLink"
    >
      <span>{{ resolvedLink.label }}</span>
    </a>
    <LinkWithTrailingSlash
      v-else
      v-bind="$attrs"
      :class="['app-button', 'body', variantClass]"
      :to="resolvedLink.to"
    >
      <span>{{ resolvedLink.label }}</span>
    </LinkWithTrailingSlash>
  </template>
</template>

<script setup lang="ts">
import { type FragmentOf } from "~/utils/graphql";
import { type LinkToRecordFragment } from "./LinkToRecord.query";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  /** A CMS link record (InternalLinkRecord / ExternalLinkRecord). */
  link: FragmentOf<typeof LinkToRecordFragment>;
}>();

const resolvedLink = computed(() => {
  if (props.link.__typename === "ExternalLinkRecord") {
    return {
      to: props.link.url,
      external: true,
      label: props.link.title,
      style: props.link.style,
    };
  }
  if (props.link.__typename === "InternalLinkRecord") {
    return {
      to: useDatoNuxtRoute(props.link.link) ?? "/",
      external: false,
      label: props.link.title,
      style: props.link.style,
    };
  }
  return null;
});

const variantClass = computed(() =>
  resolvedLink.value?.style === "secondary"
    ? "app-button--secondary"
    : "app-button--primary font-bold",
);

const href = computed(() => String(resolvedLink.value?.to ?? ""));

const LinkWithTrailingSlash = defineNuxtLink({ trailingSlash: "append" });

function trackExternalLink() {
  const to = resolvedLink.value?.to;
  if (typeof to === "string" && to.startsWith("tel:")) {
    useTrackEvent("Click on phone number");
  }
}
</script>

<style>
.app-button--secondary > span::after {
  content: "\00a0\2192";
}
</style>
