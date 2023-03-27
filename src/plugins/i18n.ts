import rosetta from 'rosetta';
import { locales } from '../lib/i18n';
import messages from '../../.cache/ui-translations.json';

const i18n = rosetta(messages);

export default defineNuxtPlugin((nuxtApp) => {
  i18n.locale(nuxtApp._route.params.language);

  function isValidLocale({ locale }) {
    return locales.find(({ code }) => code === locale);
  }

  return {
    provide: {
      t: i18n.t,
      i18n: {
        locales,
        isValidLocale,
        locale: () => {
          if (!isValidLocale({ locale: nuxtApp._route.params.language })) {
            return "en";
          }

          return nuxtApp._route.params.language;
        },
      },
    },
  };
});

