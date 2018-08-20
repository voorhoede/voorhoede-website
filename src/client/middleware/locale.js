import { SET_CURRENT_LOCALE } from '../store/mutation-types'

export default function(context) {
  context.store.commit(SET_CURRENT_LOCALE, { locale: context.route.params.locale })
}
