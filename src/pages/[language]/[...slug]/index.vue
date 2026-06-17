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

import { useFetchDatocmsContent } from "~/composables/useFetchDatocmsContent";
import { graphql } from "~/utils/graphql";
import { withQuery } from "ufo";

import { CaseListFragment } from "~/components/Blocks/CaseList/CaseList.query";
import { DialogueCtaFragment } from "~/components/Blocks/DialogueCta/DialogueCta.query";
import { GroupingFragment } from "~/components/Blocks/Grouping/Grouping.query";
import { ImageCardGridFragment } from "~/components/Blocks/ImageCardGrid/ImageCardGrid.query";
import { LogoGridFragment } from "~/components/Blocks/LogoGrid/LogoGrid.query";
import { PageHeaderFragment } from "~/components/Blocks/PageHeader/PageHeader.query";
import { PagePartialFragment } from "~/components/Blocks/PagePartial/PagePartial.query";
import { TextImageFragment } from "~/components/Blocks/TextImage/TextImage.query";

const route = useRoute();
const slug = route?.params?.slug
  // Don't include empty string fragments caused by leading or trailing slashes
  ?.filter(Boolean)
  .join("/");

const query = graphql(
  `
    query Page($locale: SiteLocale!, $slug: String) {
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
          ...GroupingFragment
          ...ImageCardGridFragment
          ...LogoGridFragment
          ...PageHeaderFragment
          ...PagePartialFragment
          ...TextImageFragment
        }
      }
    }
  `,
  [
    CaseListFragment,
    DialogueCtaFragment,
    GroupingFragment,
    ImageCardGridFragment,
    LogoGridFragment,
    PageHeaderFragment,
    PagePartialFragment,
    TextImageFragment,
  ],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: {
      locale: route.params.language as "nl" | "en",
      slug,
    },
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

<style scoped>
/*.landing-page__section + .landing-page__section:not(:has(.grouping-block)) {
  padding-top: var(--spacing-huge);
}

.landing-page__section--background,
.landing-page__section:last-child {
  padding-bottom: var(--spacing-huge);
}

.landing-page__section--pastel-background {
  background-color: var(--bg-pastel);
}

.landing-page__section--grey-background {
  background-color: var(--fog);
}

.landing-page__section:not(.landing-page__section--background)
  + .landing-page__section--background {
  margin-top: var(--spacing-big);
}

.landing-page__section--pastel-background
  + .landing-page__section--pastel-background:not(:has(.grouping-block)),
.landing-page__section--grey-background
  + .landing-page__section--grey-background:not(:has(.grouping-block)) {
  padding-top: var(--spacing-large);
}

.landing-page__section--pastel-background:has(
  + .landing-page__section--pastel-background
),
.landing-page__section--grey-background:has(
  + .landing-page__section--grey-background
) {
  padding-bottom: var(--spacing-large);
}*/
</style>
