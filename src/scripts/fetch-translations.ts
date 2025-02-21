import { locales } from '../lib/i18n.js';
import { datocmsFetch } from '../lib/datocms-fetch.js';

export const fetchTranslations = () => (
  datocmsFetch({
    query: `query Translations { ${locales.map(getLocaleQuery)} }`,
  })
    .then(({ data }) =>
      Object.fromEntries(
        locales.map(({ code }) => [
          code,
          Object.fromEntries(data[code].map(({ key, value }) => [
            key,
            value,
          ])),
        ]),
      )
    )
);

function getLocaleQuery({ code }) {
  return `
    ${code}: allTranslations(locale: ${code}, first: 100) {
      key
      value
    }
  `;
}
