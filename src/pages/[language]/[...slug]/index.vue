<template>
  <div class="landing-page">
    <h1 class="sr-only">
      {{ data?.page?.title }}
    </h1>
    <Blocks
      v-if="data?.page?.bodyBlocks"
      :blocks="data.page.bodyBlocks as BlockRecord[]"
      :host-page-id="data.page.id"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { withQuery } from "ufo";

import { EventsListBlockFragment } from "~/components/Blocks/EventsListBlock/EventsListBlock.query";
import {
  CodeBlockFragment,
  EmbedBlockFragment,
  GroupingBlockFragment,
  TestimonialBlockFragment,
} from "~/components/Blocks/GroupingBlock/GroupingBlock.query";
import { ImageGridBlockFragment } from "~/components/Blocks/ImageGridBlock/ImageGridBlock.query";
import { LocationsListBlockFragment } from "~/components/Blocks/LocationsListBlock/LocationsListBlock.query";
import { LogoGridBlockFragment } from "~/components/Blocks/LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query";
import { PageListBlockFragment } from "~/components/Blocks/PageListBlock/PageListBlock.query";
import { PagePartialBlockFragment } from "~/components/Blocks/PagePartialBlock/PagePartialBlock.query";
import { ReachOutBlockFragment } from "~/components/Blocks/ReachOutBlock/ReachOutBlock.query";
import { TeamGalleryBlockFragment } from "~/components/Blocks/TeamGalleryBlock/TeamGalleryBlock.query";
import { TextBlockFragment } from "~/components/Blocks/TextBlock/TextBlock.query";
import { TextImageBlockFragment } from "~/components/Blocks/TextImageBlock/TextImageBlock.query";
import { ActionBlockFragment } from "~/components/Blocks/ActionBlock/ActionBlock.query";
import { BlogsSectionBlockFragment } from "~/components/Blocks/BlogsSectionBlock/BlogsSectionBlock.query";
import {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "~/components/Blocks/shared/structuredText.query";
import type { BlockRecord } from "~/components/Blocks/types";

const route = useRoute();

const slug = Array.isArray(route.params.slug)
  ? route.params.slug
      // Don't include empty string fragments caused by leading or trailing slashes
      .filter(Boolean)
      .join("/")
  : route.params.slug;

const query = graphql(
  `
    query Page($locale: SiteLocale, $slug: String) {
      page(locale: $locale, filter: { slug: { eq: $slug } }) {
        id
        title
        seo {
          title
          description
          image {
            url
            alt
            width
            height
          }
        }
        bodyBlocks {
          __typename
          ...ActionBlockRecordFragment
          ...BlogsSectionBlockFragment
          ...CodeBlockFragment
          ...EmbedBlockFragment
          ...EventsListBlockFragment
          ...GroupingBlockFragment
          ...ImageBlockFragment
          ...ImageGridBlockFragment
          ...LocationsListBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...PageListBlockFragment
          ...PagePartialBlockFragment
          ...ReachOutBlockFragment
          ...TeamGalleryBlockFragment
          ...TestimonialBlockFragment
          ...TextBlockFragment
          ...TextImageBlockFragment
          ...VideoBlockFragment
          ...VideoEmbedBlockFragment
        }
      }
    }
  `,
  [
    ActionBlockFragment,
    BlogsSectionBlockFragment,
    CodeBlockFragment,
    EmbedBlockFragment,
    EventsListBlockFragment,
    GroupingBlockFragment,
    ImageBlockFragment,
    ImageGridBlockFragment,
    LocationsListBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    PageListBlockFragment,
    PagePartialBlockFragment,
    ReachOutBlockFragment,
    TeamGalleryBlockFragment,
    TestimonialBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
    VideoBlockFragment,
    VideoEmbedBlockFragment,
  ],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale: route.params.language as "nl" | "en", slug },
  });

  return result.data;
});

if (!data.value?.page) {
  throw createError({ statusCode: 404, fatal: true });
}

if (data.value.page.seo) {
  useSeoHead({
    title: data.value.page.title,
    social: data.value.page.seo,
  });
}

if (
  import.meta.client &&
  slug === "subscription-confirmation" &&
  route.query.email
) {
  fetch(
    withQuery("https://hooks.zapier.com/hooks/catch/22617085/uosq4mq/", {
      email: route.query.email,
    }),
  );
}
</script>
