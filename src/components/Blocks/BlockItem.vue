<script setup lang="ts">
import type { BlockRecord } from "./types";
import type { BackgroundColorValue } from "~/types/styling";
import { BackgroundColor } from "~/types/styling";
import ActionBlock from "./ActionBlock/ActionBlock.vue";
import BlogListBlock from "./BlogListBlock/BlogListBlock.vue";
import EventsListBlock from "./EventsListBlock/EventsListBlock.vue";
import GalleryBlock from "./GalleryBlock/GalleryBlock.vue";
import GlossaryListBlock from "./GlossaryListBlock/GlossaryListBlock.vue";
import GroupingBlock from "./GroupingBlock/GroupingBlock.vue";
import ImageGridBlock from "./ImageGridBlock/ImageGridBlock.vue";
import LocationsListBlock from "./LocationsListBlock/LocationsListBlock.vue";
import LogoGridBlock from "./LogoGridBlock/LogoGridBlock.vue";
import PageHeaderBlock from "./PageHeaderBlock/PageHeaderBlock.vue";
import PageListBlock from "./PageListBlock/PageListBlock.vue";
import PagePartialBlock from "./PagePartialBlock/PagePartialBlock.vue";
import ReachOutBlock from "./ReachOutBlock/ReachOutBlock.vue";
import TeamGalleryBlock from "./TeamGalleryBlock/TeamGalleryBlock.vue";
import TextBlock from "./TextBlock/TextBlock.vue";
import TextImageBlock from "./TextImageBlock/TextImageBlock.vue";
import ImageWithCaption from "~/components/image-with-caption/image-with-caption.vue";
import CodeBlock from "~/components/code-block/code-block.vue";
import CodePreviewBlock from "~/components/code-preview-block/code-preview-block.vue";
import TestimonialBlock from "~/components/testimonial-block/testimonial-block.vue";
import ResponsiveVideo from "~/components/responsive-video/responsive-video.vue";
import { VideoPlayer } from "vue-datocms";
import type {
  CodeBlockFragment,
  EmbedBlockFragment,
  TestimonialBlockFragment,
} from "./GroupingBlock/GroupingBlock.query";
import type {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "./shared/structuredText.query";
import { readFragment } from "~/utils/graphql";

const props = withDefaults(
  defineProps<{
    block: BlockRecord;
    theme?: BackgroundColorValue | null;
    hostPageId?: string | null;
  }>(),
  {
    theme: BackgroundColor.None,
    hostPageId: null,
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

const codeBlock = computed(() =>
  props.block.__typename === "CodeBlockRecord"
    ? readFragment<typeof CodeBlockFragment>(props.block)
    : null,
);

const embedBlock = computed(() =>
  props.block.__typename === "EmbedBlockRecord"
    ? readFragment<typeof EmbedBlockFragment>(props.block)
    : null,
);

const testimonialBlock = computed(() =>
  props.block.__typename === "TestimonialBlockRecord"
    ? readFragment<typeof TestimonialBlockFragment>(props.block)
    : null,
);

const videoEmbedBlock = computed(() =>
  props.block.__typename === "VideoEmbedBlockRecord"
    ? readFragment<typeof VideoEmbedBlockFragment>(props.block)
    : null,
);

const videoBlock = computed(() =>
  props.block.__typename === "VideoBlockRecord"
    ? readFragment<typeof VideoBlockFragment>(props.block)
    : null,
);
</script>

<template>
  <ActionBlock
    v-if="props.block?.__typename === 'ActionBlockRecord'"
    :data="props.block"
  />
  <BlogListBlock
    v-else-if="props.block?.__typename === 'BlogListBlockRecord'"
    :data="props.block"
  />
  <CodeBlock
    v-else-if="codeBlock"
    :language="codeBlock.language ?? ''"
    :content="codeBlock.body ?? ''"
  />
  <CodePreviewBlock
    v-else-if="embedBlock"
    :id="embedBlock.id"
    :title="embedBlock.title"
    :url="embedBlock.url"
    :caption="embedBlock.caption ?? ''"
    :type="embedBlock.previewType ?? 'codepen'"
  />
  <EventsListBlock
    v-else-if="props.block?.__typename === 'EventsListRecord'"
    :data="props.block"
  />
  <GalleryBlock
    v-else-if="props.block?.__typename === 'GalleryBlockRecord'"
    :data="props.block"
  />
  <GlossaryListBlock
    v-else-if="props.block?.__typename === 'GlossaryListRecord'"
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
  <LocationsListBlock
    v-else-if="props.block?.__typename === 'LocationsListRecord'"
    :data="props.block"
  />
  <LogoGridBlock
    v-else-if="props.block?.__typename === 'LogoGridRecord'"
    :data="props.block"
  />
  <PageHeaderBlock
    v-else-if="props.block?.__typename === 'PageHeaderRecord'"
    :data="props.block"
  />
  <PageListBlock
    v-else-if="props.block?.__typename === 'PageListBlockRecord'"
    :data="props.block"
    :host-page-id="props.hostPageId"
  />
  <PagePartialBlock
    v-else-if="props.block?.__typename === 'PagePartialBlockRecord'"
    :data="props.block"
    :host-page-id="props.hostPageId"
  />
  <ReachOutBlock
    v-else-if="props.block?.__typename === 'ReachOutBlockRecord'"
    :data="props.block"
  />
  <TeamGalleryBlock
    v-else-if="props.block?.__typename === 'TeamGalleryRecord'"
    :data="props.block"
  />
  <TestimonialBlock
    v-else-if="testimonialBlock"
    :testimonial="{
      quote: testimonialBlock.quote,
      author: testimonialBlock.author,
      company: testimonialBlock.company,
      validated: testimonialBlock.validated ?? true,
      fullwidth: testimonialBlock.fullwidth ?? false,
    }"
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
  <ResponsiveVideo
    v-else-if="videoEmbedBlock?.video"
    :video="{
      url: videoEmbedBlock.video.url,
      title: videoEmbedBlock.video.title ?? '',
      provider: videoEmbedBlock.video.provider as 'youtube' | 'vimeo',
      providerUid: videoEmbedBlock.video.providerUid ?? '',
      width: videoEmbedBlock.video.width ?? 16,
      height: videoEmbedBlock.video.height ?? 9,
      thumbnailUrl: videoEmbedBlock.video.thumbnailUrl ?? '',
    }"
    :autoplay="Boolean(videoEmbedBlock.autoplay)"
    :loop="Boolean(videoEmbedBlock.loop)"
    :mute="Boolean(videoEmbedBlock.mute)"
    :caption="videoEmbedBlock.caption ?? undefined"
  />
  <VideoPlayer
    v-else-if="videoBlock?.videoAsset?.video"
    :data="{
      muxPlaybackId: videoBlock.videoAsset.video.muxPlaybackId,
      title: videoBlock.videoAsset.video.title ?? videoBlock.title ?? undefined,
      width: videoBlock.videoAsset.video.width,
      height: videoBlock.videoAsset.video.height,
      blurUpThumb: videoBlock.videoAsset.video.blurUpThumb ?? undefined,
    }"
    :auto-play="Boolean(videoBlock.autoplay)"
    :muted="Boolean(videoBlock.mute)"
    :loop="Boolean(videoBlock.loop)"
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
