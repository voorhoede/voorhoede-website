<template>
  <NuxtLayout name="content-page">
    <main class="error-page">
      <h1 class="sr-only">
        {{ data?.page?.title }}
      </h1>
      <Blocks
        v-if="data?.page?.bodyBlocks?.length"
        :blocks="data.page.bodyBlocks"
      />
      <div
        v-else-if="data?.page?.title"
        class="error-page__fallback grid"
      >
        <h1 class="error-page__fallback-title">
          {{ data.page.title }}
        </h1>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { BodyBlocksFragment } from '~/components/Blocks/bodyBlocks.query';
import Blocks from '~/components/Blocks/Blocks.vue';

const { $i18n } = useNuxtApp();
const locale = $i18n.locale() as 'nl' | 'en';

const query = graphql(
  `
    query Error($locale: SiteLocale!) {
      page: notFoundPage(locale: $locale) {
        title
        bodyBlocks {
          ...BodyBlocksFragment
        }
      }
    }
  `,
  [BodyBlocksFragment],
);

const { data } = await useAsyncData(`ErrorPage-${locale}`, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale },
  });
  return result.data;
});
</script>

<style>
  .error-page__fallback {
    padding: var(--spacing-large) 0 var(--spacing-huge);
  }

  .error-page__fallback-title {
    grid-column: var(--grid-content);
  }
</style>
