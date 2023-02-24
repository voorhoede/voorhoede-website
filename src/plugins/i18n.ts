import rosetta from 'rosetta';
import { locales } from '../lib/i18n';
import messages from '../../.cache/ui-translations.json';

const i18nSlugs = {
  'language-services-slug': { en: { slug: 'validate-your-idea' }, nl: { slug: 'jouw-idee-valideren' }, },
};

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
      localeUrl: ({ name = '', params = {} } = {}) => {
        const i18nParams = i18nSlugs[name]?.[params.language];
        console.log({name, params, i18nParams})
        
        return {
          name: ['language', name.replace('language-', '')].filter(Boolean).join('-'),
          params: {
            language: nuxtApp._route.params.language || 'en',
            ...params,
            ...i18nParams,
          },
        };
      },
    },
  };
});
