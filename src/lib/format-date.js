import dayjs from 'dayjs'
import 'dayjs/locale/nl.js'


/*
 * Format date as string
 * @param {String || Object} date
 * @param {String} locale
 * @param {String} format	to render input in (eg. `DD MMM` or `LL`). See dayjs docs for options: https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#format-formatstringwithtokens-string
 */
export default function ({ date, locale, format }) {
  return dayjs(date)
    .locale(locale)
    .format(format)
}
