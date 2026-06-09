<template>
  <main>
    <h1 class="sr-only">{{ data?.homePage?.title }}</h1>
    <Blocks v-if="data?.homePage?.sections" :blocks="data.homePage.sections" />
    <div class="grid">
      <div class="page__scroll-to">
        <ScrollTo direction="up" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { useFetchDatocmsContent } from "~/composables/useFetchDatocmsContent";
import { graphql } from "~/utils/graphql";

import { CaseListFragment } from "~/components/Blocks/CaseList/CaseList.query";
import { DialogueCtaFragment } from "~/components/Blocks/DialogueCta/DialogueCta.query";
import { ImageCardGridFragment } from "~/components/Blocks/ImageCardGrid/ImageCardGrid.query";
import { LogoGridFragment } from "~/components/Blocks/LogoGrid/LogoGrid.query";
import { PageHeaderFragment } from "~/components/Blocks/PageHeader/PageHeader.query";
import { TextImageFragment } from "~/components/Blocks/TextImage/TextImage.query";

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
          ...CaseListFragment
          ...DialogueCtaFragment
          ...ImageCardGridFragment
          ...LogoGridFragment
          ...PageHeaderFragment
          ...TextImageFragment
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
    TextImageFragment,
  ],
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

<style scoped>
.page__scroll-to {
  display: none;
  grid-column-start: -2;
  grid-column-end: -3;
  margin-bottom: var(--spacing-medium);

  @media (min-width: 720px) {
    display: block;
  }
}
</style>
