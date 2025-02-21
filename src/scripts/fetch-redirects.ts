import { datocmsFetch } from '../lib/datocms-fetch.js';

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
    .then(({ data }) => data.allRedirects)
);
