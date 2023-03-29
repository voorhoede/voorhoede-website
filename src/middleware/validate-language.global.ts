export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp();
  console.info({to, from});

  if (!$i18n.isValidLocale({ locale: to.params.language }) && from.path === to.path) {
    console.warn('abortNavigation');
    return abortNavigation({ statusCode: 404, fatal: true });
  }
})

