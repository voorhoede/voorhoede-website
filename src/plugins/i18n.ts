import rosetta from 'rosetta';
import { joinURL, withTrailingSlash } from 'ufo';
import { defaultLanguage, locales } from '../lib/i18n';
import messages from '../../.cache/ui-translations.json';

const i18n = rosetta(messages);

export default defineNuxtPlugin((nuxtApp) => {
  i18n.locale(nuxtApp._route.params.language);

  addRouteMiddleware(
    'i18n-invalid-language',
    (to) => {
      if (!isValidLocale({ locale: to.params.language })) {
        return navigateTo(
          withTrailingSlash(joinURL('/', defaultLanguage, to.path)),
          { redirectCode: 302, replace: true },
        );
      }
    },
    { global: true },
  );

  return {
    provide: {
      t: i18n.t,
      i18n: {
        locales,
        isValidLocale,
        locale: () => {
          if (!isValidLocale({ locale: nuxtApp._route.params.language })) {
            return defaultLanguage;
          }

          return nuxtApp._route.params.language;
        },
      },
    },
  };
});

function isValidLocale({ locale }) {
  return locales.find(({ code }) => code === locale);
}
