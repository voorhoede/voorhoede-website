export async function useFetchContent({ key = null, query, variables }) {
  const runtimeConfig = useRuntimeConfig();
  const { path } = useRoute();
  const data = ref(null);

  if (runtimeConfig.public.baseUrl.includes('localhost')) {
    let unsubscribe;

    onMounted(async () => {
      const { subscribeToQuery } = await import('datocms-listen');

      unsubscribe = await subscribeToQuery({
        query,
        variables,
        token: runtimeConfig.public.datoApiToken,
        includeDrafts: true,
        onUpdate: ({ response }) => { data.value = response.data },
        onError: console.error,
        onChannelError: console.error,
      });
    });

    onUnmounted(() => {
      unsubscribe();
    });
  }

  const { data: initialData } = await useAsyncData(key || path, () => (
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
          console.error(response)

        return response.data
      })
  ));

  data.value = initialData.value;

  // can not rely on this being a page content query if a 'custom' key is set
  if (!key && initialData.value.page === null) {
    throw createError({ statusCode: 404 })
  }

  return { data };
};
