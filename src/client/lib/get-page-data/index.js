import getDumpedData from './get-dumped-data'

export default async function (context) {
  if (process.env.useDumpedData) {
    return getDumpedData(context)
  } else {
    const queryDato = await import('./query-dato').then(module => module.default)
    return queryDato(context)
  }
}
