export function linkValidator (item) {
  return (
    typeof item.title === 'string'
    && (
      (item.page && typeof item.page.__typename === 'string' && ['string', 'undefined'].includes(typeof item.page.slug))
      || typeof item.url === 'string'
    )
  )
}

export function createHref($i18n, page) {
  const sharedParams = { language: $i18n.locale() }

  switch (page.__typename) {
    case 'LandingPageRecord': {
      return { name: 'language-slug', params: { ...sharedParams, slug: page.slug.split('/') } }
    }
    case 'BlogPostOverviewRecord': {
      return { name: 'language-blog', params: sharedParams }
    }
    case 'BlogPostRecord': {
      return { name: 'language-blog-slug', params: { ...sharedParams, slug: page.slug } }
    }
    case 'CaseOverviewRecord': {
      return { name: 'language-cases', params: sharedParams }
    }
    case 'CaseItemRecord': {
      return { name: 'language-cases-slug', params: { ...sharedParams, slug: page.slug } }
    }
    case 'ContactRecord': {
      return { name: 'language-contact', params: sharedParams }
    }
    case 'EventOverviewRecord': {
      return { name: 'language-events', params: sharedParams }
    }
    case 'EventItemRecord': {
      return { name: 'language-events-slug', params: { ...sharedParams, slug: page.slug } }
    }
    case 'FaqRecord': {
      return { name: 'language-faq', params: sharedParams }
    }
    case 'JobRecord': {
      return { name: 'language-jobs-slug', params: { ...sharedParams, slug: page.slug } }
    }
    case 'LustrumRecord': {
      return { name: 'language-lustrum', params: sharedParams }
    }
    case 'ServiceOverviewRecord': {
      return { name : 'language-services', params: sharedParams }
    }
    case 'ServiceRecord': {
      return { name : 'language-services-slug', params: { ...sharedParams, slug: page.slug } }
    }
    case 'PersonRecord': {
      return { name: 'language-team-slug', params: { ...sharedParams, slug: page.slug } }
    }
    case 'WorkatRecord': {
      return { name: 'language-work-at', params: sharedParams }
    }
  }
}
