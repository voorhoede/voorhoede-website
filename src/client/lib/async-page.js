import { SET_I18N_SLUGS } from '~/store/mutation-types'

export default async function asyncPage ({ route, store, error }) {
  try {
    const data = await fetchPage(route.fullPath)
    store.commit(SET_I18N_SLUGS, data.page.i18nSlugs)
    return data
  } catch (e) {
    error(e)
  }
}

export function fetchPage(route) {
  const filepath = `/data/${route}index.json`
  if (process.client) {
    // On client load over http
    return fetch(filepath).then(res => res.json())
  } else {
    // On server load from file system
    const data = JSON.parse(require('fs').readFileSync(`src/client/static${filepath}`, 'utf8'))
    return Promise.resolve(data)
  }
}
