const fetch = require('node-fetch')
const backoff = require('backoff')

const token = process.env.DATO_API_TOKEN

module.exports = function({ query, variables }) {
  const queryBackoff = backoff.fibonacci({
    maxDelay: 5000
  })

  queryBackoff.failAfter(5)

  return new Promise((resolve, reject) => {
    queryBackoff.on('ready', () => {
      doQuery({ query, variables })
        .then(data => {
          queryBackoff.reset()
          resolve(data)
        })
        .catch(err => queryBackoff.backoff(err))
    })
    queryBackoff.on('fail', err => {
      reject(err)
    })
    queryBackoff.backoff()
  })
}

export function doQuery({ query, variables }) {
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
      if (!res.ok) {
        throw new Error(`Error fetching data. ${res.statusText}`)
      }
      if (res.errors) {
        throw new Error(JSON.stringify(res.errors))
      }
      return res.json()
    })
    .then((res) => res.data)
}
