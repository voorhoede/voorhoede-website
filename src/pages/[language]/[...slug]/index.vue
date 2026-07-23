<template>
  <div class="landing-page">
    <h1 class="sr-only">
      {{ data?.page?.title }}
    </h1>
    <Blocks v-if="data?.page?.bodyBlocks" :blocks="data.page.bodyBlocks" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { withQuery } from "ufo";

import { CaseListBlockFragment } from "~/components/Blocks/CaseListBlock/CaseListBlock.query";
import { GroupingBlockFragment } from "~/components/Blocks/GroupingBlock/GroupingBlock.query";
import { LogoGridBlockFragment } from "~/components/Blocks/LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query";
import { PagePartialBlockFragment } from "~/components/Blocks/PagePartialBlock/PagePartialBlock.query";
import { ReachOutBlockFragment } from "~/components/Blocks/ReachOutBlock/ReachOutBlock.query";
import { TeamGalleryBlockFragment } from "~/components/Blocks/TeamGalleryBlock/TeamGalleryBlock.query";
import { TextBlockFragment } from "~/components/Blocks/TextBlock/TextBlock.query";
import { TextImageBlockFragment } from "~/components/Blocks/TextImageBlock/TextImageBlock.query";

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
          ...CaseListBlockFragment
          ...GroupingBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
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
    CaseListBlockFragment,
    GroupingBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
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
    variables: { locale: route.params.language as "nl" | "en", slug },
  });

  return result.data;
});

if (data.value?.page && data.value.page.seo) {
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
