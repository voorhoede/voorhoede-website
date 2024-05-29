import { datocmsFetch } from '../lib/datocms-fetch.ts';

export const fetchRedirects = () => (
  datocmsFetch({
    query: `
      query Redirects {
        allRedirects(first: 100) {
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
