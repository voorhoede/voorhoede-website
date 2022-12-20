import { locales } from '../client/lib/i18n.js';

export const fetchTranslations = ({ datoApiToken }) => (
  fetch(`https://graphql.datocms.com/`, {
    method: 'post',
    headers: { 'Authorization': datoApiToken },
    body: JSON.stringify({
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
    }),
  })
    .then(response => response.json())
    .then(({ data }) => Object.fromEntries(
      locales.map(({ code }) => [
        code,
        Object.fromEntries(data[code].map(({ key, value }) => [
          key,
          value.replace('{', '{{').replace('}', '}}'),
        ]))
      ])
    ))
);
