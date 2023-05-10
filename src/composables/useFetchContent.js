import { datocmsFetch } from '../lib/datocms-fetch.ts';
import { datocmsEnvironment } from '../constants.mjs';

export async function useFetchContent({ key = null, query: queryDocument, variables }) {
  const query = queryDocument.loc.source.body
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const data = ref(null);
  const isPreview =
    runtimeConfig.public.baseUrl.includes("localhost") ||
    (route.query.preview === "true" &&
      route.query.previewSecret === runtimeConfig.public.previewSecret);

  if (isPreview) {
    let unsubscribe;

    onMounted(async () => {
      const { subscribeToQuery } = await import('datocms-listen');

      unsubscribe = await subscribeToQuery({
        query,
        variables,
        environment: datocmsEnvironment,
        token: runtimeConfig.public.datoApiToken,
        includeDrafts: true,
        onUpdate: ({ response }) => { data.value = response.data; },
        onError: console.error,
        onChannelError: console.error,
        preview: true,
      });
    });

    onUnmounted(() => {
      unsubscribe?.();
    });
  }

  const pageKey =
    key ||
    [route.name, ...Object.values(route.params)].filter(Boolean).join('-');

  const { data: initialData } = await useAsyncData(pageKey, () => (
    datocmsFetch({
      fetcher: $fetch,
      apiToken: runtimeConfig.public.datoApiToken,
      query,
      variables,
      preview: isPreview,
    })
      .then(({ data }) => data)
  ));

  data.value = initialData.value;

  // can not rely on this being a page content query if a 'custom' key is set
  if (!key && initialData.value.page === null) {
    console.error('no page data found for', route.path);
    throw createError({ statusCode: 404, fatal: true });
  }

  return { data };
}
