import { withTrailingSlash } from 'ufo';

export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.path.endsWith('/')) {
    return navigateTo(
      withTrailingSlash(to.fullPath, true),
      { redirectCode: 308 },
    );
  }
});
