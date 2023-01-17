export const fetchRedirects = ({ datoApiToken }) => (
  fetch(`https://graphql.datocms.com/`, {
    method: 'post',
    headers: { 'authorization': datoApiToken },
    body: JSON.stringify({
      query: `
        query Redirects {
          allRedirects {
            from
            to
            httpStatusCode
          }
        }
      `,
    }),
  })
    .then(response => response.json())
    .then(({ data }) => (
      data.allRedirects
        .map((rule) => `${rule.from} ${rule.to} ${rule.httpStatusCode}`)
        .join('\n')
    ))
);
