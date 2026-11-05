<template>
  <div class="landing-page">
    <h1 class="sr-only">
      {{ data?.page?.title }}
    </h1>
    <Blocks
      v-if="data?.page?.bodyBlocks"
      :blocks="data.page.bodyBlocks as BlockRecord[]"
      :host-page-id="data.page.id"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { withQuery } from "ufo";

import { BodyBlocksFragment } from "~/components/Blocks/bodyBlocks.query";
import { LocationsListBlockFragment } from "~/components/Blocks/LocationsListBlock/LocationsListBlock.query";
import type { BlockRecord } from "~/components/Blocks/types";

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
          ...BodyBlocksFragment
          ...LocationsListBlockFragment
        }
      }
    }
  `,
  [BodyBlocksFragment, LocationsListBlockFragment],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale: route.params.language as "nl" | "en", slug },
  });

  return result.data;
});

if (!data.value?.page) {
  throw createError({ statusCode: 404, fatal: true });
}

if (data.value.page.seo) {
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
