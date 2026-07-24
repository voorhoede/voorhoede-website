<script setup lang="ts">
import type { BlockRecord } from "./types";
import type { BackgroundColorValue } from "~/types/styling";
import { BackgroundColor } from "~/types/styling";
import CaseListBlock from "./CaseListBlock/CaseListBlock.vue";
import GroupingBlock from "./GroupingBlock/GroupingBlock.vue";
import ImageGridBlock from "./ImageGridBlock/ImageGridBlock.vue";
import LogoGridBlock from "./LogoGridBlock/LogoGridBlock.vue";
import PageHeaderBlock from "./PageHeaderBlock/PageHeaderBlock.vue";
import PagePartialBlock from "./PagePartialBlock/PagePartialBlock.vue";
import ReachOutBlock from "./ReachOutBlock/ReachOutBlock.vue";
import TeamGalleryBlock from "./TeamGalleryBlock/TeamGalleryBlock.vue";
import TextBlock from "./TextBlock/TextBlock.vue";
import TextImageBlock from "./TextImageBlock/TextImageBlock.vue";
import ImageWithCaption from "~/components/image-with-caption/image-with-caption.vue";
import type { ImageBlockFragment } from "./shared/structuredText.query";
import { readFragment } from "~/utils/graphql";

const props = withDefaults(
  defineProps<{
    block: BlockRecord;
    theme?: BackgroundColorValue | null;
  }>(),
  {
    theme: BackgroundColor.None,
  },
);

const imageBlock = computed(() =>
  props.block.__typename === "ImageBlockRecord"
    ? readFragment<typeof ImageBlockFragment>(props.block)
    : null,
);

const imageCaptionPosition = computed((): "bottom" | "left" | "right" => {
  const position = imageBlock.value?.captionPosition;
  if (position === "left" || position === "right" || position === "bottom") {
    return position;
  }
  return "bottom";
});
</script>

<template>
  <CaseListBlock
    v-if="props.block?.__typename === 'CaseListBlockRecord'"
    :data="props.block"
  />
  <GroupingBlock
    v-else-if="props.block?.__typename === 'GroupingBlockRecord'"
    :data="props.block"
  />
  <ImageGridBlock
    v-else-if="props.block?.__typename === 'ImageGridBlockRecord'"
    :data="props.block"
    :theme="props.theme"
  />
  <LogoGridBlock
    v-else-if="props.block?.__typename === 'LogoGridRecord'"
    :data="props.block"
  />
  <PageHeaderBlock
    v-else-if="props.block?.__typename === 'PageHeaderRecord'"
    :data="props.block"
  />
  <PagePartialBlock
    v-else-if="props.block?.__typename === 'PagePartialBlockRecord'"
    :data="props.block"
  />
  <ReachOutBlock
    v-else-if="props.block?.__typename === 'ReachOutBlockRecord'"
    :data="props.block"
  />
  <TeamGalleryBlock
    v-else-if="props.block?.__typename === 'TeamGalleryRecord'"
    :data="props.block"
  />
  <TextBlock
    v-else-if="props.block?.__typename === 'TextBlockRecord'"
    :data="props.block"
  />
  <TextImageBlock
    v-else-if="props.block?.__typename === 'TextImageBlockRecord'"
    :data="props.block"
    :theme="props.theme"
  />
  <ImageWithCaption
    v-else-if="imageBlock"
    :image="{
      url: imageBlock.image.url,
      alt: imageBlock.image.alt ?? '',
      width: imageBlock.image.width!,
      height: imageBlock.image.height!,
      title: imageBlock.caption || imageBlock.image.title || '',
      author: imageBlock.image.author || '',
      sizes: '(min-width: 1100px) 1100px, (min-width: 720px) 75vw, 90vw',
    }"
    :caption-position="imageCaptionPosition"
  />
</template>
