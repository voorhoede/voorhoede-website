export default function () {
  if (!this.page) { return }

  const { authors, customHead, social } = this.page
  const currentLocale = this.currentLocale
  const baseUrl = process.env.baseUrl
  const defaultShareTitle = 'De Voorhoede'
  const defaultShareImg = `${baseUrl}/images/social/logo-wide.jpg`
  const pageTitle = social.title ? social.title : defaultShareTitle

  let socialDescription = social.description

  if (authors) {
    const mappedAuthors = authors.map(author => {
      return author.twitterHandle ? author.twitterHandle : author.name
    }).join(' ')

    socialDescription = `${socialDescription} by ${mappedAuthors} @devoorhoede`
  }

  return {
    htmlAttrs: {
      lang: currentLocale
    },
    title: pageTitle,
    meta: [
      { name: 'description', content: social.description },
      { property: 'og:url', content: `${baseUrl}${this.$route.path}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: social.description },
      { property: 'og:image', content:  social.image ? social.image.url : defaultShareImg  },
      { property: 'og:image:width', content: '1000' },
      { property: 'og:image:height', content: '500' },
      { property: 'og:site_name', content: 'www.voorhoede.nl' },
      /* Twitter */
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@devoorhoede' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: socialDescription },
      { name: 'twitter:image', content: social.image ? social.image.url : defaultShareImg },
    ],
    ...customHead,
  }
}
