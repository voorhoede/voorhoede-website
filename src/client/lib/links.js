export function linkValidator (item) {
  return (
    typeof item.title === 'string'
    && (
      (item.page && typeof item.page.slug === 'string')
      || typeof item.url === 'string'
    )
  )
}

export function createHref (item, locale) {
  return (item.page.slug)
    ? `/${locale}/${item.page.slug}`
    : item.url
}
