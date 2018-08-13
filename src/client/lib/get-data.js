const fetch = require('node-fetch')
const token = '1956fa5400c0f63150d7210ca7ca35'

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
