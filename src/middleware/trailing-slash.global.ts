import { parseFilename, withTrailingSlash, hasTrailingSlash } from 'ufo';

export default defineNuxtRouteMiddleware((to) => {
  if (!hasTrailingSlash(to.path) && !parseFilename(to.path, { strict: true })) {
    return navigateTo(withTrailingSlash(to.fullPath, true), {
      redirectCode: 308,
    });
  }
});
