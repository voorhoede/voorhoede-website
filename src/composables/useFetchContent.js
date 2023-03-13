export async function useFetchContent({ key = null, query, variables }) {
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const data = ref(null);

  if (runtimeConfig.public.baseUrl.includes('localhost') ||
    (route.query.preview === 'true' && route.query.previewSecret === runtimeConfig.public.previewSecret)
  ) {
    let unsubscribe;

    onMounted(async () => {
      const { subscribeToQuery } = await import('datocms-listen');

      unsubscribe = await subscribeToQuery({
        query,
        variables,
        token: runtimeConfig.public.datoApiToken,
        includeDrafts: true,
        onUpdate: ({ response }) => { data.value = response.data; },
        onError: console.error,
        onChannelError: console.error,
        preview: true,
      });
    });

    onUnmounted(() => {
      unsubscribe();
    });
  }

  const pageKey =
    key ||
    [route.name, ...Object.values(route.params)].filter(Boolean).join('-');

  const { data: initialData } = await useAsyncData(pageKey, () => (
    $fetch(`https://graphql.datocms.com/`, {
      method: 'post',
      headers: { 'Authorization': runtimeConfig.public.datoApiToken },
      body: {
        query,
        variables,
      },
    })
      .then((response) => {
        if (response.errors)
          console.error(
            'request to dato failed',
            '\n',
            JSON.stringify(response.errors, null, 2),
          );

        return response.data;
      })
  ));

  data.value = initialData.value;

  // can not rely on this being a page content query if a 'custom' key is set
  if (!key && initialData.value.page === null) {
    console.error('no page data found for', route.path);
    throw createError({ statusCode: 404 });
  }

  return { data };
}
