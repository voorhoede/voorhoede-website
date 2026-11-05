<template>
  <div class="structured-text">
    <StructuredTextDatocms
      :data="props.data"
      :render-link-to-record="renderLinkToRecord"
      :render-block="renderBlock"
      :render-inline-record="renderInlineRecord"
      :render-inline-block="renderInlineBlock"
      :custom-node-rules="customNodeRules"
      :custom-mark-rules="customMarkRules"
    />
  </div>
</template>

<script setup lang="ts">
import { h, type VNode } from "vue";
import {
  StructuredText as StructuredTextDatocms,
  VideoPlayer,
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
  isHeading,
  isList,
} from "datocms-structured-text-utils";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import { type LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";
import { footnoteId, openGlossaryPopover } from "~/lib/glossary-popover";
import { type GlossaryTerm } from "~/composables/usePageGlossaryTerms";
import type {
  ActionBlockFragment,
  IconBlockFragment,
  ImageBlockFragment,
  VariableBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "~/components/Blocks/shared/structuredText.query";
import type { ActionBlockFragment as ActionBlockRecordFragment } from "~/components/Blocks/ActionBlock/ActionBlock.query";

import LinkToRecord from "~/components/Core/LinkToRecord/LinkToRecord.vue";
import ActionBlock from "~/components/Blocks/ActionBlock/ActionBlock.vue";
import ImageWithCaption from "~/components/image-with-caption/image-with-caption.vue";
import ResponsiveVideo from "~/components/responsive-video/responsive-video.vue";
import AppIcon from "~/components/app-icon/app-icon.vue";
import slugify from "~/lib/slugify";

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

function renderGlossaryRef(
  record: GlossaryTerm,
  label: Array<VNode | string>,
) {
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

function renderInlineRecord({
  record,
}: {
  record: CdaStructuredTextRecord & {
    term?: string;
    title?: string;
  };
}) {
  if (record.__typename === "GlossaryTermRecord") {
    return renderGlossaryRef(record as unknown as GlossaryTerm, [
      record.term ?? "",
    ]);
  }
  const resolvedRoute = useDatoNuxtRoute(record);
  return h(LinkWithTrailingSlash, { to: resolvedRoute }, record.title);
}

function renderInlineBlock({
  record,
}: RenderBlockContext<CdaStructuredTextRecord>) {
  switch (record.__typename) {
    case "IconBlockRecord": {
      const data = readFragment<typeof IconBlockFragment>(
        record as unknown as FragmentOf<typeof IconBlockFragment>,
      );
      return h(AppIcon, {
        name: data.name,
        alt: data.title ?? "",
      });
    }
    case "VariableBlockRecord": {
      const data = readFragment<typeof VariableBlockFragment>(
        record as unknown as FragmentOf<typeof VariableBlockFragment>,
      );
      const label = data.variable.displayTitle || data.variable.title;
      return h(
        "span",
        { class: "structured-text__variable" },
        data.variable.value ? `${label}: ${data.variable.value}` : label,
      );
    }
    default:
      return null;
  }
}

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
    case "ActionBlockRecord": {
      const data = readFragment<typeof ActionBlockFragment>(
        record as unknown as FragmentOf<typeof ActionBlockFragment>,
      );
      return h(ActionBlock, {
        class: "structured-text__action-block",
        data: data as unknown as FragmentOf<typeof ActionBlockRecordFragment>,
      });
    }
    case "ImageBlockRecord": {
      const data = readFragment<typeof ImageBlockFragment>(
        record as unknown as FragmentOf<typeof ImageBlockFragment>,
      );
      return h(ImageWithCaption, {
        class: "structured-text__image-with-caption",
        captionPosition:
          (data.captionPosition as "left" | "right" | "bottom" | null) ??
          undefined,
        image: {
          url: data.image.url,
          alt: data.image.alt ?? undefined,
          width: data.image.width!,
          height: data.image.height!,
          author: data.image.author ?? "",
          title: data.caption ?? data.image.title ?? "",
          sizes: data.fullWidth
            ? "100vw"
            : "(min-width: 1100px) 1100px, (min-width: 720px) 75vw, 90vw",
        },
      });
    }
    case "VideoEmbedBlockRecord": {
      const data = readFragment<typeof VideoEmbedBlockFragment>(
        record as unknown as FragmentOf<typeof VideoEmbedBlockFragment>,
      );
      return h(ResponsiveVideo, {
        class: "structured-text__video",
        video: {
          url: data.video.url,
          title: data.video.title,
          provider: data.video.provider as "youtube" | "vimeo",
          providerUid: data.video.providerUid,
          width: data.video.width,
          height: data.video.height,
          thumbnailUrl: data.video.thumbnailUrl,
        },
        autoplay: data.autoplay,
        loop: data.loop,
        mute: data.mute,
        caption: data.caption ?? undefined,
      });
    }
    case "VideoBlockRecord": {
      const data = readFragment<typeof VideoBlockFragment>(
        record as unknown as FragmentOf<typeof VideoBlockFragment>,
      );
      const video = data.videoAsset.video;
      return h(VideoPlayer, {
        class: "structured-text__video",
        data: {
          muxPlaybackId: video.muxPlaybackId,
          title: video.title ?? data.title ?? undefined,
          width: video.width,
          height: video.height,
          blurUpThumb: video.blurUpThumb ?? undefined,
        },
        autoPlay: data.autoplay,
        muted: data.mute,
        loop: data.loop,
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
  renderNodeRule(isHeading, ({ node, key, children }) => {
    const title = node.children
      .map((child) => ("value" in child ? String(child.value ?? "") : ""))
      .join("");
    return h(
      `h${node.level}`,
      {
        key,
        id: title ? slugify(title) : undefined,
        class: [`h${node.level} structured-text__heading`, node.style],
      },
      children,
    );
  }),
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
  renderNodeRule(isList, ({ node, key, children }) =>
    h(
      node.style === "numbered" ? "ol" : "ul",
      { key, class: "structured-text__list" },
      children,
    ),
  ),
];
</script>

<style scoped>
.structured-text :deep(.structured-text__heading) {
  margin-top: var(--spacing-medium);
  margin-bottom: var(--spacing-small);
}

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

:deep(.structured-text__action-block) {
  margin-top: var(--spacing-medium);
}

.structured-text :deep(.blue) {
  color: var(--html-blue);
}

.structured-text :deep(.centered) {
  text-align: center;
  justify-self: center;
  max-width: 40rem;
}

.structured-text :deep(.intro) {
  font-size: 2rem;
  margin-top: var(--spacing-large);
}

:deep(.structured-text__image-with-caption) {
  margin: var(--spacing-big) 0;
}

:deep(.structured-text__video) {
  margin: var(--spacing-big) 0;
}

.structured-text :deep(.list),
.structured-text :deep(.numbered-list) {
  margin-top: var(--spacing-small);
  margin-bottom: var(--spacing-small);
}

.structured-text :deep(.structured-text__list) {
  padding-left: var(--spacing-medium);
  margin-top: var(--spacing-small);
  margin-bottom: var(--spacing-small);
}

/* Global reset sets list-style: none — restore markers for Structured Text lists */
.structured-text :deep(ul.structured-text__list) {
  list-style-type: disc;
  list-style-position: outside;
}

.structured-text :deep(ol.structured-text__list) {
  list-style-type: decimal;
  list-style-position: outside;
  font-family: var(--font-sans);
  font-weight: 700;
}

.structured-text :deep(.structured-text__list > li) {
  display: list-item;
}

.structured-text :deep(.structured-text__list > li + li) {
  margin-top: var(--spacing-medium);
}

.structured-text :deep(.structured-text__list > li > p) {
  margin: 0;
}

:deep(.structured-text__glossary-ref) {
  margin-right: 0.5em;
}

:deep(.structured-text__glossary-ref-number) {
  padding-left: 0.25em;
}
</style>
