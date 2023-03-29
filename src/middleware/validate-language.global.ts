export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp();

  if (!$i18n.isValidLocale({ locale: to.params.language })) {
    console.warn('abortNavigation');
    return abortNavigation({ statusCode: 404, fatal: true });
  }
})

