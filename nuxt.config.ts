import { defineNuxtConfig } from 'nuxt/config';
import { writeFile, mkdir } from 'node:fs/promises';
import { default as nuxtIcons } from 'nuxt-icons';
import { default as plausible } from '@nuxtjs/plausible';
import { fetchTranslations } from './src/scripts/fetch-translations';
import { fetchBlogFeed } from './src/scripts/fetch-blog-feed';
import { fetchRedirects } from './src/scripts/fetch-redirects';
import { fetchRoutes } from './src/scripts/fetch-routes';
import { fetchI18nSlugs } from './src/scripts/fetch-i18n-slugs';

export default defineNuxtConfig({
  srcDir: 'src',
  typescript: {
    shim: false,
  },
  css: [
    '@/components/app-core/index.css',
  ],
  nitro: {
    prerender: {
      crawlLinks: false
    },
    future: {
      nativeSWR: true,
    },
  },
  runtimeConfig: {
    public: {
      datoApiToken: process.env.DATOCMS_API_READ_TOKEN,
      baseUrl: process.env.BASE_URL,
      previewSecret: process.env.PREVIEW_SECRET
    },
  },
  modules: [
    nuxtIcons,
    plausible,
  ],
  plausible: {
    apiHost: '/mogelijk',
  },
  hooks: {
    'prerender:routes': ({ routes }) => {
      fetchRoutes()
        .then((generatedRoutes) => {
          generatedRoutes.forEach((route) => {
            // routes is of type Set, so we need to add each route individually
            routes.add(route);
          })
        })
    },
    'build:before': () => Promise.all([
      fetchTranslations()
        .then(async (translations) => {
          await mkdir('.cache', { recursive: true });
          await writeFile('.cache/ui-translations.json', JSON.stringify(translations));
        }),
      fetchBlogFeed()
        .then(async (blogFeed) => {
          await mkdir('./src/public/blog', { recursive: true });
          await writeFile('./src/public/blog/feed.json', JSON.stringify(blogFeed));
        }),
      fetchRedirects()
        .then((redirects) => writeFile('./src/public/_redirects', redirects)),
      fetchI18nSlugs()
        .then(async (data) => {
          await mkdir('.cache', { recursive: true });
          await writeFile('.cache/i18n-slugs.json', JSON.stringify(data));
        }),
    ])
      // hook expects a promise with no return data
      .then(() => {}),
  },
});
