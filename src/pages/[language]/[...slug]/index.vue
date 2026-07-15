<template>
  <div class="landing-page">
    <h1 class="sr-only">
      {{ data?.page?.title }}
    </h1>
    <Blocks v-if="data?.page?.sections" :blocks="data.page.sections" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { withQuery } from "ufo";

import { BlogsSectionBlockFragment } from "~/components/Blocks/BlogsSectionBlock/BlogsSectionBlock.query";
import { CallToActionBlockFragment } from "~/components/Blocks/CallToActionBlock/CallToActionBlock.query";
import { CaseListBlockFragment } from "~/components/Blocks/CaseListBlock/CaseListBlock.query";
import { DialogueCtaBlockFragment } from "~/components/Blocks/DialogueCtaBlock/DialogueCtaBlock.query";
import { EventsSectionBlockFragment } from "~/components/Blocks/EventsSectionBlock/EventsSectionBlock.query";
import { GlossarySectionBlockFragment } from "~/components/Blocks/GlossarySectionBlock/GlossarySectionBlock.query";
import { ImageCardGridBlockFragment } from "~/components/Blocks/ImageCardGridBlock/ImageCardGridBlock.query";
import { ImageGridBlockFragment } from "~/components/Blocks/ImageGridBlock/ImageGridBlock.query";
import { InterstitialCtaBlockFragment } from "~/components/Blocks/InterstitialCtaBlock/InterstitialCtaBlock.query";
import { JobsListBlockFragment } from "~/components/Blocks/JobsListBlock/JobsListBlock.query";
import { LogoGridBlockFragment } from "~/components/Blocks/LogoGridBlock/LogoGridBlock.query";
import { NewsletterBlockFragment } from "~/components/Blocks/NewsletterBlock/NewsletterBlock.query";
import { PageHeaderBlockFragment } from "~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query";
import { PagePartialBlockFragment } from "~/components/Blocks/PagePartialBlock/PagePartialBlock.query";
import { ReachOutBlockFragment } from "~/components/Blocks/ReachOutBlock/ReachOutBlock.query";
import { ResponsiveVideoBlockFragment } from "~/components/Blocks/ResponsiveVideoBlock/ResponsiveVideoBlock.query";
import { TeamGalleryBlockFragment } from "~/components/Blocks/TeamGalleryBlock/TeamGalleryBlock.query";
import { TextBlockFragment } from "~/components/Blocks/TextBlock/TextBlock.query";
import { TimelineBlockFragment } from "~/components/Blocks/TimelineBlock/TimelineBlock.query";

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
        social {
          title
          description
          image {
            url
            alt
            width
            height
          }
        }
        sections {
          __typename
          ...BlogsSectionBlockFragment
          ...CallToActionBlockFragment
          ...CaseListBlockFragment
          ...DialogueCtaBlockFragment
          ...EventsSectionBlockFragment
          ...GlossarySectionBlockFragment
          ...ImageCardGridBlockFragment
          ...ImageGridBlockFragment
          ...InterstitialCtaBlockFragment
          ...JobsListBlockFragment
          ...LogoGridBlockFragment
          ...NewsletterBlockFragment
          ...PageHeaderBlockFragment
          ...PagePartialBlockFragment
          ...ReachOutBlockFragment
          ...ResponsiveVideoBlockFragment
          ...TeamGalleryBlockFragment
          ...TextBlockFragment
          ...TimelineBlockFragment
        }
      }
    }
  `,
  [
    BlogsSectionBlockFragment,
    CallToActionBlockFragment,
    CaseListBlockFragment,
    DialogueCtaBlockFragment,
    EventsSectionBlockFragment,
    GlossarySectionBlockFragment,
    ImageCardGridBlockFragment,
    ImageGridBlockFragment,
    InterstitialCtaBlockFragment,
    JobsListBlockFragment,
    LogoGridBlockFragment,
    NewsletterBlockFragment,
    PageHeaderBlockFragment,
    PagePartialBlockFragment,
    ReachOutBlockFragment,
    ResponsiveVideoBlockFragment,
    TeamGalleryBlockFragment,
    TextBlockFragment,
    TimelineBlockFragment,
  ],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale: route.params.language as "nl" | "en", slug },
  });

  return result.data;
});

if (data.value?.page && data.value.page.social) {
  useSeoHead({
    title: data.value.page.title,
    social: data.value.page.social,
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
