<template>
  <div class="landing-page">
    <h1 class="sr-only">
      {{ data?.page?.title }}
    </h1>
    <Blocks :blocks="data?.page?.sections" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { withQuery } from "ufo";

import { CaseListBlockFragment } from "~/components/Blocks/CaseListBlock/CaseListBlock.query";
import { DialogueCtaBlockFragment } from "~/components/Blocks/DialogueCtaBlock/DialogueCtaBlock.query";
import { ImageCardGridBlockFragment } from "~/components/Blocks/ImageCardGridBlock/ImageCardGridBlock.query";
import { LogoGridBlockFragment } from "~/components/Blocks/LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query";
import { PagePartialBlockFragment } from "~/components/Blocks/PagePartialBlock/PagePartialBlock.query";

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
          ...CaseListBlockFragment
          ...DialogueCtaBlockFragment
          ...ImageCardGridBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...PagePartialBlockFragment
        }
      }
    }
  `,
  [
    CaseListBlockFragment,
    DialogueCtaBlockFragment,
    ImageCardGridBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    PagePartialBlockFragment,
  ],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale: route.params.language as "nl" | "en", slug },
  });
  console.log({ result });

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
