import { datocmsFetch } from '../lib/datocms-fetch.ts';

export const fetchRedirects = ({ datoApiToken }) => (
  datocmsFetch({
    fetcher: fetch,
    apiToken: datoApiToken,
    query: `
      query Redirects {
        allRedirects {
          from
          to
          httpStatusCode
        }
      }
    `,
    })
      .then(({ data }) => (
        data.allRedirects
          .map((rule) => `${rule.from} ${rule.to} ${rule.httpStatusCode}`)
          .join('\n')
      ))
);
