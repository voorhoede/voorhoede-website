<template>
  <NuxtLayout name="content-page">
    <main class="error-page">
      <h1 class="sr-only">
        {{ data?.page?.title }}
      </h1>
      <Blocks
        v-if="data?.page?.bodyBlocks?.length"
        :blocks="data.page.bodyBlocks"
      />
      <div
        v-else-if="data?.page?.title"
        class="error-page__fallback grid"
      >
        <h1 class="error-page__fallback-title">
          {{ data.page.title }}
        </h1>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { EventsListBlockFragment } from '~/components/Blocks/EventsListBlock/EventsListBlock.query';
import { GalleryBlockFragment } from '~/components/Blocks/GalleryBlock/GalleryBlock.query';
import { GlossaryListBlockFragment } from '~/components/Blocks/GlossaryListBlock/GlossaryListBlock.query';
import {
  CodeBlockFragment,
  EmbedBlockFragment,
  GroupingBlockFragment,
  TestimonialBlockFragment,
} from '~/components/Blocks/GroupingBlock/GroupingBlock.query';
import { ImageGridBlockFragment } from '~/components/Blocks/ImageGridBlock/ImageGridBlock.query';
import { LogoGridBlockFragment } from '~/components/Blocks/LogoGridBlock/LogoGridBlock.query';
import { PageHeaderBlockFragment } from '~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query';
import { PageListBlockFragment } from '~/components/Blocks/PageListBlock/PageListBlock.query';
import { PagePartialBlockFragment } from '~/components/Blocks/PagePartialBlock/PagePartialBlock.query';
import { ReachOutBlockFragment } from '~/components/Blocks/ReachOutBlock/ReachOutBlock.query';
import { TeamGalleryBlockFragment } from '~/components/Blocks/TeamGalleryBlock/TeamGalleryBlock.query';
import { TextBlockFragment } from '~/components/Blocks/TextBlock/TextBlock.query';
import { TextImageBlockFragment } from '~/components/Blocks/TextImageBlock/TextImageBlock.query';
import { ActionBlockFragment } from '~/components/Blocks/ActionBlock/ActionBlock.query';
import { BlogListBlockFragment } from '~/components/Blocks/BlogListBlock/BlogListBlock.query';
import {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from '~/components/Blocks/shared/structuredText.query';
import Blocks from '~/components/Blocks/Blocks.vue';

const { $i18n } = useNuxtApp();
const locale = $i18n.locale() as 'nl' | 'en';

const query = graphql(
  `
    query Error($locale: SiteLocale!) {
      page: notFoundPage(locale: $locale) {
        title
        bodyBlocks {
          __typename
          ...ActionBlockRecordFragment
          ...BlogListBlockFragment
          ...CodeBlockFragment
          ...EmbedBlockFragment
          ...EventsListBlockFragment
          ...GalleryBlockFragment
          ...GlossaryListBlockFragment
          ...GroupingBlockFragment
          ...ImageBlockFragment
          ...ImageGridBlockFragment
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
    BlogListBlockFragment,
    CodeBlockFragment,
    EmbedBlockFragment,
    EventsListBlockFragment,
    GalleryBlockFragment,
    GlossaryListBlockFragment,
    GroupingBlockFragment,
    ImageBlockFragment,
    ImageGridBlockFragment,
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

const { data } = await useAsyncData(`ErrorPage-${locale}`, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale },
  });
  return result.data;
});
</script>

<style>
  .error-page__fallback {
    padding: var(--spacing-large) 0 var(--spacing-huge);
  }

  .error-page__fallback-title {
    grid-column: var(--grid-content);
  }
</style>
