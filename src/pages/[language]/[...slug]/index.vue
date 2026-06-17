<template>
  <div class="landing-page">
    <h1 class="sr-only">
      {{ data.page.title }}
    </h1>
    <Blocks :blocks="data.page.sections" />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: 'content-page' });

  import { Blocks } from '~/components/Blocks';
  import query from './index.query.graphql?raw';
  import { withQuery } from 'ufo';

  const route = useRoute();
  const slug = route.params.slug
    // Don't include empty string fragments caused by leading or trailing slashes
    .filter(Boolean)
    .join('/');

  const { data } = await useFetchContent({
    query,
    variables: {
      locale: route.params.language,
      slug,
    },
  });

  useSeoHead(data.value.page);

  if (
    import.meta.client &&
    slug === 'subscription-confirmation' &&
    route.query.email
  ) {
    fetch(
      withQuery('https://hooks.zapier.com/hooks/catch/22617085/uosq4mq/', {
        email: route.query.email,
      }),
    );
  }
</script>


