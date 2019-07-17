import { SET_I18N_SLUGS } from '~/store/mutation-types'
import getData from './get-page-data'

export default async function asyncPage (context) {
  try {
    const data = await getData(context)
    context.store.commit(SET_I18N_SLUGS, data.page.i18nSlugs)
    return data
  } catch (e) {
    return context.error({
      statusCode: 404,
    })
  }
}
