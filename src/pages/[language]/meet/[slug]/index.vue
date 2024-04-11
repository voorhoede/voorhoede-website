<template>
  <NuxtLayout
    name="content-page"
    :hide-footer="true"
  >
    <main class="page-meet grid">
      <h1 class="sr-only">
        {{ title }}
      </h1>
      <iframe
        class="page-meet__iframe"
        :src="person.meet.url"
        :title="title"
      />
    </main>
  </NuxtLayout>
</template>

<script setup>
  import personQuery from './index.query.graphql?raw'

  const instance = getCurrentInstance()
  const route = useRoute()

  const { data: { value: { person } } } = await useFetchContent({
    query: personQuery,
    variables: {
      slug: route.params.slug,
      locale: route.params.language,
    },
  })

  if (!person) {
    throw createError({ statusCode: 404, fatal: true })
  }

  onMounted(() => {
    useTrackEvent('Meet page view')
  })

  const title = computed(() => {
    const { $t } = instance.appContext.config.globalProperties
    const fullName = `${person.name}${person.lastName ? ` ${person.lastName}` : ''}`

    return $t("schedule_meeting_with_person", { name: fullName })
  })

  useSeoHead({
    social: {
      ...person.meet.seo,
      title: person.meet.seo?.title || title.value,
      description: person.meet.seo?.description || person.biography,
    }
  })
</script>

<style>
  .page-meet {
    grid-template-rows: var(--app-header-height-small) auto;
    height: 100vh;
  }

  @media (min-width: 1100px) {
    .page-meet {
      grid-template-rows: var(--app-header-height-large) auto;
    }
  }

  .page-meet__iframe {
    grid-column: var(--grid-page);
    grid-row: 2;
    height: 100%;
    width: 100%;
  }
</style>
