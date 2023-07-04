import { withTrailingSlash } from 'ufo';

export function useSeoHead({ title, i18nSlugs, social }) {
  if (!social) {
    throw new Error('Missing required SEO data');
  }

  const { $i18n } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const router = useRouter();

  const pageUrl = new URL(route.path, runtimeConfig.public.baseUrl).toString();
  const defaultShareImg = new URL('/images/logo-wide.jpg', runtimeConfig.public.baseUrl).toString();

  useHead({
    title: social.title || title,
    meta: [
      { name: 'description', content: social.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:title', content: social.title || title || 'De Voorhoede' },
      { property: 'og:description', content: social.description },
      { property: 'og:image', content: social.image?.url || defaultShareImg },
      { property: 'og:image:width', content: '1000' },
      { property: 'og:image:height', content: '500' },
      { name: 'twitter:title', content: social.title || title || 'De Voorhoede' },
      { name: 'twitter:description', content: social.description },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@devoorhoede' },
      { name: 'twitter:image', content: social.image?.url || defaultShareImg },
    ],
    link: [
      { rel: 'me', href: 'https://fosstodon.org/@devoorhoede' },
      { rel: 'canonical', href: pageUrl },
      ...$i18n.locales
        .map(({ code }) => {
          const alternateSlug = i18nSlugs?.find((i18nSlug) => i18nSlug.locale === code).value;
          const formattedAlternateSlug = alternateSlug?.includes('/') ? alternateSlug.split('/') : alternateSlug

          return {
            rel: 'alternate',
            hreflang: code,
            href: withTrailingSlash(
              new URL(
                router.resolve({
                  params: {
                    language: code,
                    slug: formattedAlternateSlug,
                  },
                }).path,
                runtimeConfig.public.baseUrl,
              ).href
            )
          }
        }),
    ],
  });
}
