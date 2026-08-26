import { datocmsFetch } from '../lib/datocms-fetch.js';

const pageSize = 100;

export const fetchRedirects = async () => {
  const redirectRules = [];

  while (true) {
    const { data } = await datocmsFetch({
      query: `
        query Redirects($first: IntType!, $skip: IntType!) {
          allRedirectRules(first: $first, skip: $skip) {
            from
            to
            statusCode
          }
        }
      `,
      variables: { first: pageSize, skip: redirectRules.length },
    });
    redirectRules.push(...data.allRedirectRules);

    if (data.allRedirectRules.length < pageSize) {
      return redirectRules;
    }
  }
};
