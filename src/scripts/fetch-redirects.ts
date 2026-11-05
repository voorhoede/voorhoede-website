import { datocmsFetch } from '../lib/datocms-fetch.js';

export const fetchRedirects = () => (
  datocmsFetch({
    query: `
      query Redirects {
        allRedirectRules(first: 100) {
          from
          to
          statusCode
        }
      }
    `,
  })
    .then(({ data }) => data.allRedirectRules)
);
