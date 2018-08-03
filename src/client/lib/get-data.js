function getRemoteData({ locale, uri, folder }) {
  const rootPath = folder ? `/data/${folder}` : '/data'
  const localePath = locale ? `${rootPath}/${locale}` : rootPath
  const url = `${localePath}/${uri}.json`

  if (process.client) {
    // On client load over http
    return fetch(url).then(res => res.json())
  } else {
    // On server load from file system
    const data = JSON.parse(require('fs').readFileSync(`src/client/static${url}`, 'utf8'))
    return Promise.resolve(data)
  }
}

export function getPageData(args) {
  return getRemoteData({ ...args, folder: 'pages' })
}

export function getData(args) {
  return getRemoteData(args)
}
