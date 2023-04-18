import { datocmsFetch } from '../lib/datocms-fetch.ts';

export const fetchRedirects = () => (
  datocmsFetch({
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
