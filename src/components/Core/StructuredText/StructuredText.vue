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
import { type FragmentOf, readFragment } from "~/utils/graphql";
import { type LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";
import type {
  BlueTextFragment,
  ButtonsListFragment,
  HighlightedListFragment,
  CounterItemListFragment,
  ImageBlockFragment,
  StructuredTextImageFragment,
} from "~/components/Blocks/shared/structuredText.query";

import LinkToRecord from "~/components/Core/LinkToRecord/LinkToRecord.vue";
import StructuredText from "./StructuredText.vue";
import CounterItemList from "~/components/counter-item-list/counter-item-list.vue";
import ImageWithCaption from "~/components/image-with-caption/image-with-caption.vue";

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

// A masked structured-text body field rendered recursively by this component.
type NestedBody = CdaStructuredTextValue;

function renderBlock({
  record,
}: RenderBlockContext<
  FragmentOf<typeof LinkToRecordFragment> & CdaStructuredTextRecord
>) {
  switch (record.__typename) {
    case "ExternalLinkRecord":
    case "InternalLinkRecord": {
      return h(LinkToRecord, { link: record });
    }
    case "StructuredTextBlueTextRecord": {
      const data = readFragment<typeof BlueTextFragment>(
        record as unknown as FragmentOf<typeof BlueTextFragment>,
      );
      return h(StructuredText, {
        data: data.body as unknown as NestedBody,
        class: {
          "structured-text__blue-text": true,
          "structured-text__blue-text--center": data.textAlignment === "center",
        },
      });
    }
    case "StructuredTextButtonsListRecord": {
      const data = readFragment<typeof ButtonsListFragment>(
        record as unknown as FragmentOf<typeof ButtonsListFragment>,
      );
      return h(
        "div",
        { class: "structured-text__buttons-list" },
        data.buttons.map((button, index) =>
          h(LinkToRecord, { key: index, link: button }),
        ),
      );
    }
    case "StructuredTextHighlightedListRecord": {
      const data = readFragment<typeof HighlightedListFragment>(
        record as unknown as FragmentOf<typeof HighlightedListFragment>,
      );
      return h(
        "ul",
        { class: "structured-text__highlighted-list" },
        data.items.map((item, index) =>
          h(
            "li",
            { key: index, class: "structured-text__highlighted-list-item" },
            h(StructuredText, { data: item.body as unknown as NestedBody }),
          ),
        ),
      );
    }
    case "StructuredTextCounterItemListRecord": {
      const data = readFragment<typeof CounterItemListFragment>(
        record as unknown as FragmentOf<typeof CounterItemListFragment>,
      );
      return h(CounterItemList, { items: data.items });
    }
    case "ImageRecord": {
      const data = readFragment<typeof ImageBlockFragment>(
        record as unknown as FragmentOf<typeof ImageBlockFragment>,
      );
      return h(ImageWithCaption, {
        class: "structured-text__image-with-caption",
        caption: data.caption ?? "",
        captionPosition: data.captionPosition ?? undefined,
        image: {
          ...data.image,
          sizes: "(min-width: 1100px) 860px, (min-width: 720px) 75vw, 90vw",
        },
      });
    }
    case "StructuredTextImageRecord": {
      const data = readFragment<typeof StructuredTextImageFragment>(
        record as unknown as FragmentOf<typeof StructuredTextImageFragment>,
      );
      return h(ImageWithCaption, {
        class: "structured-text__image-with-caption",
        caption: data.caption ?? "",
        image: {
          ...data.image,
          sizes: "(min-width: 1100px) 680px, (min-width: 720px) 60vw, 90vw",
        },
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

.structured-text__buttons-list {
  margin-top: var(--spacing-medium);
  display: inline-flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--spacing-small);
}

.structured-text__blue-text {
  color: var(--html-blue);
  margin-bottom: var(--spacing-medium);
}

.structured-text__blue-text--center {
  text-align: center;
}

.structured-text__image-with-caption {
  margin: var(--spacing-big) 0;
}

.structured-text__column-image {
  margin-top: var(--spacing-tiny);
  margin-bottom: 0;
}

.structured-text__highlighted-list-item {
  padding: var(--spacing-medium);
  background-color: var(--white);
}

.structured-text__highlighted-list-item + .structured-text__highlighted-list-item {
  margin-top: var(--spacing-medium);
}
</style>
