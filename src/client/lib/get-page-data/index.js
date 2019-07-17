import getDumpedData from './get-dumped-data'

export default async function (context) {
  if (process.env.useDumpedData) {
    return getDumpedData(context)
  } else {
    const queryDato = await import(/* webpackChunkName: "dev-dato-query" */ './query-dato').then(module => module.default)
    return queryDato(context)
  }
}
