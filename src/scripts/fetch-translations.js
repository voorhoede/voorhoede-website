import { locales } from '../lib/i18n.js';
import { datocmsFetch } from '../lib/datocms-fetch.ts';

export const fetchTranslations = () => (
  datocmsFetch({
    query: `
      query Translations {
        ${locales.map(({ code }) => `
          ${code}: allTranslations(locale: ${code}, first: 100) {
            key
            value
          }
        `)}
      }
    `,
  })
    .then(({ data }) => Object.fromEntries(
      locales.map(({ code }) => [
        code,
        Object.fromEntries(data[code].map(({ key, value }) => [
          key,
          value,
        ]))
      ])
    ))
);
