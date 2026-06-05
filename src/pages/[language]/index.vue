<template>
  <main>
    <h1 class="sr-only">{{ data?.homePage?.title }}</h1>
    <Blocks v-if="data?.homePage?.sections" :blocks="data.homePage.sections" />
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { useFetchDatocmsContent } from "~/composables/useFetchDatocmsContent";
import { graphql } from "~/utils/graphql";

import { LogoGridFragment } from "~/components/Blocks/LogoGrid/LogoGrid.query";
import { CaseListFragment } from "~/components/Blocks/CaseList/CaseList.query";
import { DialogueCtaFragment } from "~/components/Blocks/DialogueCta/DialogueCta.query";

const route = useRoute();
const query = graphql(
  `
    query HomePage($locale: SiteLocale!) {
      homePage(locale: $locale) {
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
        sections {
          __typename
          ...LogoGridFragment
          ...CaseListFragment
          ...DialogueCtaFragment
        }
      }
    }
  `,
  [LogoGridFragment, CaseListFragment, DialogueCtaFragment],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale: route.params.language as "nl" | "en" },
  });

  return result.data;
});

if (data.value?.homePage && data.value.homePage.seo) {
  useSeoHead({
    title: data.value.homePage.title,
    social: data.value.homePage.seo,
  });
}
</script>
