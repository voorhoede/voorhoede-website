<template>
  <div class="landing-page">
    <h1 class="sr-only">
      {{ data?.page?.title }}
    </h1>
    <Blocks :blocks="data.page.sections" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { withQuery } from "ufo";

import { CaseListFragment } from "~/components/Blocks/CaseList/CaseList.query";
import { DialogueCtaFragment } from "~/components/Blocks/DialogueCta/DialogueCta.query";
import { ImageCardGridFragment } from "~/components/Blocks/ImageCardGrid/ImageCardGrid.query";
import { LogoGridFragment } from "~/components/Blocks/LogoGrid/LogoGrid.query";
import { PageHeaderFragment } from "~/components/Blocks/PageHeader/PageHeader.query";
import { PagePartialFragment } from "~/components/Blocks/PagePartial/PagePartial.query";

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
          ...CaseListFragment
          ...DialogueCtaFragment
          ...ImageCardGridFragment
          ...LogoGridFragment
          ...PageHeaderFragment
          ...PagePartialFragment
        }
      }
    }
  `,
  [
    CaseListFragment,
    DialogueCtaFragment,
    ImageCardGridFragment,
    LogoGridFragment,
    PageHeaderFragment,
    PagePartialFragment,
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
