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
const pageKey = [route.name, ...Object.values(route.params)]
  .filter(Boolean)
  .join("-");
const { data } = await useAsyncData(pageKey, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale: route.params.language as "nl" | "en" },
  });

  console.log("result.error", result.error);
  console.log("result.data", result.data);

  return result.data;
});
</script>
