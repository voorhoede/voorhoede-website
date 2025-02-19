import { datocmsEnvironment } from '../constants.mjs';

export async function datocmsFetch(
  {
    fetcher = fetch,
    apiToken = process.env.DATOCMS_API_READ_TOKEN,
    query,
    variables = {},
    preview = false,
  },
) {
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 500);
  });

  return fetcher('https://graphql.datocms.com/', {
    method: 'post',
    headers: {
      'Authorization': apiToken,
      'X-Environment': datocmsEnvironment,
      ...(preview && { 'X-Include-Drafts': 'true' }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((response) => response.json?.() || response)
    .then((jsonData) => {
      if (jsonData.errors) {
        console.error(
          'Response from dato contains errors',
          '\n',
          JSON.stringify(jsonData.errors, null, 2),
        );
      }

      return jsonData;
    });
}
