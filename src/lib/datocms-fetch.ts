export function datocmsFetch({ fetcher, apiToken, query, variables = {} }) {
  return fetcher('https://graphql.datocms.com/', {
    method: 'post',
    headers: { 'Authorization': apiToken },
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
