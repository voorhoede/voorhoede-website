export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp();

  if (!$i18n.isValidLocale()) {
    return abortNavigation({ statusCode: 404 });
  }
})

