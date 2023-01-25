import rosetta from 'rosetta';
import { locales } from '../lib/i18n';
import messages from '../../.cache/ui-translations.json';

const i18n = rosetta(messages);

export default defineNuxtPlugin((nuxtApp) => {
  i18n.locale(nuxtApp._route.params.language);

  return {
    provide: {
      t: i18n.t,
      i18n: {
        locale: nuxtApp._route.params.language,
        locales,
      },
    },
  };
});
