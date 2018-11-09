import { SET_CURRENT_LOCALE, SET_ALTERNATE_URL } from '../store/mutation-types'

export default function ({ path, commit, dispatch, locales }) {
  const localeRegex = new RegExp(`^/(${locales.join('|')})/`)
  let localeFromPath = path.match(localeRegex)[0]

  if (localeFromPath) {
    localeFromPath = localeFromPath.replace(/\//g, '')
    const alternateLocale = locales.find(locale => locale !== localeFromPath)
    const alternateUrl = path.replace(localeFromPath, alternateLocale)
    commit(SET_CURRENT_LOCALE, { locale: localeFromPath })
    commit(SET_ALTERNATE_URL, { url: alternateUrl })
    dispatch('getLayoutData')
  }
}
