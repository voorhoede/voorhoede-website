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
  const { page, url } = item
  const directory = getDirectoryByTypename(page.__typename)

  if (page.slug && page.__typename) {
    return `/${this.$i18n.locale}/${directory}/${page.slug}/`
  } else if (page.slug) {
    return `/${this.$i18n.locale}/${page.slug}/`
  } else {
    return url
  }
}

function getDirectoryByTypename (type) {
  switch (type) {
    case 'ServiceRecord': {
      return 'services'
    }
    default: ''
  }
}
