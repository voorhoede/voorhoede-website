<template>
  <StructuredTextDatocms
    class="structured-text"
    :data="props.data"
    :render-link-to-record="renderLinkToRecord"
    :render-block="renderBlock"
    :render-inline-record="renderInlineRecord"
    :custom-node-rules="customNodeRules"
    :custom-mark-rules="customMarkRules"
  />
</template>

<script setup lang="ts">
import { h } from "vue";
import {
  StructuredText as StructuredTextDatocms,
  type RenderBlockContext,
  type RenderRecordLinkContext,
  renderNodeRule,
  renderMarkRule,
} from "vue-datocms";
import {
  type CdaStructuredTextValue,
  type CdaStructuredTextRecord,
  isParagraph,
  isLink,
} from "datocms-structured-text-utils";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import { type LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";
import { footnoteId, openGlossaryPopover } from "~/lib/glossary-popover";
import { type GlossaryTerm } from "~/composables/usePageGlossaryTerms";
import type {
  ButtonsListFragment,
  HighlightedListFragment,
  CounterItemListFragment,
  ImageFragment,
} from "~/components/Blocks/shared/structuredText.query";

import LinkToRecord from "~/components/Core/LinkToRecord/LinkToRecord.vue";
import StructuredText from "./StructuredText.vue";
import CounterItemList from "~/components/counter-item-list/counter-item-list.vue";
import ImageWithCaption from "~/components/image-with-caption/image-with-caption.vue";

const props = defineProps<{
  data: CdaStructuredTextValue;
}>();

const LinkWithTrailingSlash = defineNuxtLink({ trailingSlash: "append" });

const pageGlossaryTerms = usePageGlossaryTerms();
const additions = (props.data?.links ?? [])
  .filter(
    (link) =>
      link.__typename === "GlossaryTermRecord" &&
      !pageGlossaryTerms.value.some((term) => term.id === link.id),
  )
  .map((link) => link as unknown as GlossaryTerm);
if (additions.length > 0) {
  pageGlossaryTerms.value = [...pageGlossaryTerms.value, ...additions];
}

function renderGlossaryRef(record: GlossaryTerm, label: VNode[]) {
  const number =
    pageGlossaryTerms.value.findIndex((term) => term.id === record.id) + 1;
  return h(
    "a",
    {
      href: `#${footnoteId(record.slug)}`,
      class: "structured-text__glossary-ref",
      onClick: (event: MouseEvent) => openGlossaryPopover(event, record.slug),
    },
    [
      ...label,
      h("sup", { class: "structured-text__glossary-ref-number" }, `[${number}]`),
    ],
  );
}

function renderLinkToRecord({
  record,
  children,
}: RenderRecordLinkContext<CdaStructuredTextRecord>) {
  if (record.__typename === "GlossaryTermRecord") {
    return renderGlossaryRef(record as unknown as GlossaryTerm, [
      ...(children as VNode[]),
    ]);
  }
  const resolvedRoute = useDatoNuxtRoute(record);
  return h(LinkWithTrailingSlash, { to: resolvedRoute }, children);
}

function renderInlineRecord({ record }) {
  if (record.__typename === "GlossaryTermRecord") {
    return renderGlossaryRef(record as unknown as GlossaryTerm, [record.term]);
  }
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
      const data = readFragment<typeof ImageFragment>(
        record as unknown as FragmentOf<typeof ImageFragment>,
      );
      return h(ImageWithCaption, {
        class: "structured-text__image-with-caption",
        captionPosition: data.captionPosition ?? undefined,
        image: {
          ...data.image,
          sizes: "(min-width: 1100px) 1100px, (min-width: 720px) 75vw, 90vw",
        },
      });
    }
    default:
      return null;
  }
}

// Custom styles plugin > custom mark rules
const customMarkRules = [
  renderMarkRule("blue", ({ key, children }) =>
    h("span", { key, class: "blue" }, children),
  ),
];

const customNodeRules = [
  // Prevent empty newlines from rendering empty paragraphs
  renderNodeRule(isParagraph, ({ node, key, children }) => {
    // @ts-expect-error children is untyped
    const validChildren = children.filter((child) =>
      typeof child === "string" ? child.trim() : child,
    );

    if (validChildren.length === 0) {
      return null;
    }

    // node.style is passed on for custom styles plugin
    return h("p", { key, class: node.style }, validChildren);
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
.structured-text :deep(a:not(.app-button)) {
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

:deep(.structured-text__buttons-list) {
  margin-top: var(--spacing-medium);
  display: inline-flex;
  justify-content: baseline;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--spacing-medium);
}

.structured-text :deep(.blue) {
  color: var(--html-blue);
}

.structured-text :deep(.centered) {
  text-align: center;
  justify-self: center;
  max-width: 40rem;
}

:deep(.structured-text__image-with-caption) {
  margin: var(--spacing-big) 0;
}

:deep(.structured-text__highlighted-list-item) {
  padding: var(--spacing-medium);
  background-color: var(--white);
}

:deep(.structured-text__highlighted-list-item + .structured-text__highlighted-list-item) {
  margin-top: var(--spacing-medium);
}

:deep(.structured-text__glossary-ref) {
  margin-right: 0.5em;
}

:deep(.structured-text__glossary-ref-number) {
  padding-left: 0.25em;
}
</style>
