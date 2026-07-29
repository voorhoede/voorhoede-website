<template>
  <div class="landing-page">
    <h1 class="sr-only">
      {{ data?.page?.title }}
    </h1>
    <Blocks
      v-if="data?.page?.bodyBlocks"
      :blocks="data.page.bodyBlocks"
      :host-page-id="data.page.id"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'content-page' });

import { CaseListBlockFragment } from '~/components/Blocks/CaseListBlock/CaseListBlock.query';
import { EventsListBlockFragment } from '~/components/Blocks/EventsListBlock/EventsListBlock.query';
import { GroupingBlockFragment } from '~/components/Blocks/GroupingBlock/GroupingBlock.query';
import { ImageGridBlockFragment } from '~/components/Blocks/ImageGridBlock/ImageGridBlock.query';
import { LocationsListBlockFragment } from '~/components/Blocks/LocationsListBlock/LocationsListBlock.query';
import { LogoGridBlockFragment } from '~/components/Blocks/LogoGridBlock/LogoGridBlock.query';
import { PageHeaderBlockFragment } from '~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query';
import { PageListBlockFragment } from '~/components/Blocks/PageListBlock/PageListBlock.query';
import { PagePartialBlockFragment } from '~/components/Blocks/PagePartialBlock/PagePartialBlock.query';
import { ReachOutBlockFragment } from '~/components/Blocks/ReachOutBlock/ReachOutBlock.query';
import { TeamGalleryBlockFragment } from '~/components/Blocks/TeamGalleryBlock/TeamGalleryBlock.query';
import { TextBlockFragment } from '~/components/Blocks/TextBlock/TextBlock.query';
import { TextImageBlockFragment } from '~/components/Blocks/TextImageBlock/TextImageBlock.query';
import { ActionBlockFragment } from '~/components/Blocks/ActionBlock/ActionBlock.query';
import Blocks from '~/components/Blocks/Blocks.vue';

const route = useRoute();
const slug = `services/${route.params.slug}`;

const query = graphql(
  `
    query ServicesSlug($locale: SiteLocale, $slug: String) {
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
          ...CaseListBlockFragment
          ...EventsListBlockFragment
          ...GroupingBlockFragment
          ...ImageGridBlockFragment
          ...LocationsListBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...PageListBlockFragment
          ...PagePartialBlockFragment
          ...ReachOutBlockFragment
          ...TeamGalleryBlockFragment
          ...TextBlockFragment
          ...TextImageBlockFragment
        }
      }
    }
  `,
  [
    ActionBlockFragment,
    CaseListBlockFragment,
    EventsListBlockFragment,
    GroupingBlockFragment,
    ImageGridBlockFragment,
    LocationsListBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    PageListBlockFragment,
    PagePartialBlockFragment,
    ReachOutBlockFragment,
    TeamGalleryBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
  ],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: {
      locale: route.params.language as 'nl' | 'en',
      slug,
    },
  });
  return result.data;
});

if (!data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

if (data.value.page.seo) {
  useSeoHead({
    title: data.value.page.title,
    social: data.value.page.seo,
  });
}
</script>
