export default function () {
  const page = this.page
  const currentLocale = this.currentLocale
  const baseUrl = process.env.baseUrl
  const defaultShareTitle = 'De Voorhoede'
  const defaultShareImg = `${baseUrl}/images/social/logo-wide.jpg`
  const pageTitle = page.social.title ? page.social.title : defaultShareTitle

  return {
    htmlAttrs: {
      lang: currentLocale
    },
    title: pageTitle,
    meta: [
      { 'name': 'description', 'content': page.social.description },
      { 'name': 'keywords', 'content': page.keywords },
      /* Twitter */
      { 'name': 'twitter:card', 'content': 'summary_large_image' },
      { 'name': 'twitter:creator', 'content': '@devoorhoede' },
      { 'name': 'twitter:title', 'content': pageTitle },
      { 'name': 'twitter:description', 'content': page.social.description },
      { 'name': 'twitter:image', 'content': page.social.image ? page.social.image.url : defaultShareImg },
    ],
  }
}
