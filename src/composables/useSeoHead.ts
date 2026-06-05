import { withTrailingSlash } from 'ufo';
import { mastodonUrl } from '../constants.mjs';

export function useSeoHead(
  {
    title,
    i18nSlugs,
    social,
  }: {
    title: string;
    i18nSlugs?: unknown;
    social: Record<string, string | unknown>;
  },
) {
  if (!social) {
    throw new Error('Missing required SEO data');
  }

  const { $i18n } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const router = useRouter();

  const pageUrl = withTrailingSlash(new URL(route.path, runtimeConfig.public.baseUrl).toString());
  const defaultShareImg = new URL('/images/logo-wide.jpg', runtimeConfig.public.baseUrl).toString();
  const canonicalUrl = runtimeConfig.public.originalUrl
    ? withTrailingSlash(new URL(route.path, runtimeConfig.public.originalUrl).toString())
    : pageUrl;

  useHead({
    title: social.title || title,
    meta: [
      { name: 'description', content: String(social.description) },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:title', content: String(social.title || title || 'De Voorhoede') },
      { property: 'og:description', content: String(social.description) },
      // @ts-expect-error social is not typed
      { property: 'og:image', content: social.image?.url || defaultShareImg },
      { property: 'og:image:width', content: '1000' },
      { property: 'og:image:height', content: '500' },
    ],
    link: [
      { rel: 'me', href: mastodonUrl },
      { rel: 'canonical', href: canonicalUrl },
      runtimeConfig.public.originalUrl
        ? {
          rel: 'alternate',
          hreflang: $i18n.locale(),
          href: pageUrl,
        }
        : null,
      ...$i18n.locales
        .map(({ code }: { code: string }) => {
          // @ts-expect-error i18nSlugs is not typed
          const alternateSlug = i18nSlugs?.find((i18nSlug) => i18nSlug.locale === code)?.value;
          if (i18nSlugs && !alternateSlug) {
            return null;
          }
          const formattedAlternateSlug = alternateSlug?.includes('/') ? alternateSlug.split('/') : alternateSlug;

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
              ).href,
            ),
          };
        }),
    ],
  });
}
