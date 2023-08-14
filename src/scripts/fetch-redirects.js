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
    .then(({ data }) => Object.fromEntries(
      data.allRedirects
        .map((rule) => [
          rule.from,
          { redirect: { to: rule.to, statusCode: rule.httpStatusCode } }
        ])
    ))
);
