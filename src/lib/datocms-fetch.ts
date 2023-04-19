export function datocmsFetch(
  {
    fetcher = fetch,
    apiToken = process.env.DATO_API_TOKEN,
    query,
    variables = {},
    preview = false,
  },
) {
  return fetcher('https://graphql.datocms.com/', {
    method: 'post',
    headers: {
      'Authorization': apiToken,
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
