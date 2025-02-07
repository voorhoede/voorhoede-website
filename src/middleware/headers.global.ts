import { setHeaders } from 'h3';

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) {
    setHeaders(useRequestEvent()!, {
      'Strict-Transport-Security':
        'max-age=63072000; includeSubDomains; preload',
      'Referrer-Policy': 'no-referrer-when-downgrade',
      'X-Frame-Options': 'SAMEORIGIN',
    });
  }
});
