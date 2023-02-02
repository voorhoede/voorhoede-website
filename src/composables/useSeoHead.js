import { withTrailingSlash } from 'ufo';
import { ogImageUrl } from '../lib/og-image-url';

export function useSeoHead({ slug, i18nSlugs, social, title, headerIllustration, authors }) {
  if (!slug || !social) {
    throw new Error('Missing required SEO data');
  }

  const { $i18n } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const router = useRouter();

  const pageUrl = new URL(route.path, runtimeConfig.public.baseUrl).toString();
  const defaultShareImg = ogImageUrl({
    title: social.title,
    authors,
    imageUrl: headerIllustration?.url,
    baseUrl: runtimeConfig.public.baseUrl,
  })

  useHead({
    title: social.title,
    meta: [
      { name: 'description', content: social.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:title', content: social.title || 'De Voorhoede' },
      { property: 'og:description', content: social.description },
      { property: 'og:image', content: defaultShareImg },
      { property: 'og:image:width', content: '1000' },
      { property: 'og:image:height', content: '500' },
      { name: 'twitter:title', content: social.title || 'De Voorhoede' },
      { name: 'twitter:description', content: social.description },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@devoorhoede' },
      { name: 'twitter:image', defaultShareImg },
    ],
    link: [
      ...$i18n.locales
        .filter(({ code }) => $i18n.locale !== code)
        .map(({ code }) => ({
          rel: 'alternate',
          hreflang: code,
          href: withTrailingSlash(
            new URL(
              router.resolve({
                params: {
                  language: code,
                  slug: i18nSlugs?.find((i18nSlug) => i18nSlug.locale === code).value || slug,
                },
              }).path,
              runtimeConfig.public.baseUrl,
            ).href
          )
        })),
    ],
  });
}
