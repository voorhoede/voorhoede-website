export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) return;

  const { $i18n } = useNuxtApp();

  if (!$i18n.isValidLocale()) {
    return abortNavigation({ statusCode: 404 });
  }
})

