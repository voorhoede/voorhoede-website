<template>
  <StructuredTextDatocms
    class="structured-text"
    :data="props.data"
    :render-link-to-record="renderLinkToRecord"
    :render-block="renderBlock"
    :render-inline-record="renderInlineRecord"
    :custom-node-rules="customNodeRules"
  />
</template>

<script setup lang="ts">
import { h } from "vue";
import {
  StructuredText as StructuredTextDatocms,
  type RenderBlockContext,
  type RenderRecordLinkContext,
  renderNodeRule,
} from "vue-datocms";
import {
  type CdaStructuredTextValue,
  type CdaStructuredTextRecord,
  isParagraph,
  isLink,
} from "datocms-structured-text-utils";
import { type FragmentOf } from "~/utils/graphql";
import { type LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

import LinkToRecord from "~/components/Core/LinkToRecord/LinkToRecord.vue";

const props = defineProps<{
  data: CdaStructuredTextValue;
}>();

const LinkWithTrailingSlash = defineNuxtLink({ trailingSlash: "append" });

function renderLinkToRecord({
  record,
  children,
}: RenderRecordLinkContext<CdaStructuredTextRecord>) {
  const resolvedRoute = useDatoNuxtRoute(record);
  return h(LinkWithTrailingSlash, { to: resolvedRoute }, children);
}

function renderInlineRecord({ record }) {
  const resolvedRoute = useDatoNuxtRoute(record);
  return h(LinkWithTrailingSlash, { to: resolvedRoute }, record.title);
}

function renderBlock({
  record,
}: RenderBlockContext<
  FragmentOf<typeof LinkToRecordFragment> & CdaStructuredTextRecord
>) {
  switch (record.__typename) {
    case "ExternalLinkRecord":
    case "InternalLinkRecord": {
      return h(LinkToRecord, {
        link: record,
      });
    }
    default:
      return null;
  }
}

const customNodeRules = [
  // Prevent empty newlines from rendering empty paragraphs
  renderNodeRule(isParagraph, ({ key, children }) => {
    // @ts-expect-error children is untyped
    const validChildren = children.filter((child) =>
      typeof child === "string" ? child.trim() : child,
    );

    if (validChildren.length === 0) {
      return null;
    }

    return h("p", { key }, validChildren);
  }),
  // Make external links open in new tab
  renderNodeRule(isLink, ({ node, key, children }) => {
    const isExternal = node.url.startsWith("http");

    return h(
      "a",
      {
        href: node.url,
        key,
        ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
      },
      children,
    );
  }),
];
</script>

<style scoped>
.structured-text :deep(a) {
  color: var(--html-blue);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.28em;

  &:focus,
  &:hover {
    outline: none;
    color: var(--active-blue);
    text-decoration-thickness: 2px;
  }
}
</style>
