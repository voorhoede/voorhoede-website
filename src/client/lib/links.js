export function linkValidator (item) {
  return (
    typeof item.title === 'string'
    && (
      (item.page && typeof item.page.slug === 'string')
      || typeof item.url === 'string'
    )
  )
}

export function createHref (item) {
  return (item.page.slug)
    ? `/${this.$i18n.locale}/${item.page.slug}`
    : item.url
}
