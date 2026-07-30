type Page = {
  __typename: string
  slug?: string
  parents?: Page[]
}

export function useDatoNuxtRoute(page: Page) {
  const { $i18n } = useNuxtApp()

  const sharedParams = { language: $i18n.locale() }

  switch (page.__typename) {
    case 'PageRecord': {
      return { name: 'language-slug', params: { ...sharedParams, slug: page.slug?.split('/') } }
    }
    case 'BlogPostRecord': {
      return { name: 'language-blog-slug', params: { ...sharedParams, slug: page.slug } }
    }
    case 'EventRecord': {
      return { name: 'language-events-slug', params: { ...sharedParams, slug: page.slug } }
    }
    case 'HomePageRecord': {
      return { name: 'language', params: sharedParams }
    }
    case 'PersonRecord': {
      return { name: 'language-team-slug', params: { ...sharedParams, slug: page.slug } }
    }
  }
}
