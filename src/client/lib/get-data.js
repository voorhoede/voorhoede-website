const fetch = require('node-fetch')
const token = process.env.DATO_API_TOKEN

export function getData({ query, variables }) {
  return fetch(
    'https://graphql.datocms.com/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  )
    .then(res => {
      return res.json()
    })
    .then((res) => res.data)
}
