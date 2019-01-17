export default function setShareInfo( page, currentLocale ) {
  const baseUrl = process.env.baseUrl
  const defaultShareImg = `${baseUrl}/images/social/logo-wide.jpg`

  return {
    htmlAttrs: {
      lang: currentLocale
    },
    title: page.social.title,
    meta: [
      { 'name': 'description', 'content': page.social.description },
      { 'name': 'keywords', 'content': page.keywords },
      { 'name': 'twitter:title', 'content': page.social.title },
      { 'name': 'twitter:description', 'content': page.social.description },
      { 'name': 'twitter:image', 'content': page.social.image ? page.social.image.url : defaultShareImg },
    ],
  }
}