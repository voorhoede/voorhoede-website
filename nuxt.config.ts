import { defineNuxtConfig } from 'nuxt/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { default as nuxtIcons } from 'nuxt-icons';
import { default as plausible } from '@nuxtjs/plausible';
import { fetchTranslations } from './src/scripts/fetch-translations';
import { fetchBlogFeed } from './src/scripts/fetch-blog-feed';
import { fetchRedirects } from './src/scripts/fetch-redirects';
import { fetchI18nSlugs } from './src/scripts/fetch-i18n-slugs';
import { defaultLanguage } from './src/lib/i18n';

export default defineNuxtConfig({
  compatibilityDate: '2025-01-17',
  srcDir: 'src',
  css: [
    '@/components/app-core/index.css',
  ],
  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      crawlLinks: true,
      routes: [`/${defaultLanguage}/`],
      concurrency: 35, // stay below 40 to avoid rate limiting
      interval: 1000, // use 1 second interval to avoid rate limiting
      failOnError: false,
    },
    routeRules: {
      '/': { prerender: false },
      '/*/blog/': { prerender: false },
      '/blog-feed.xml': {
        redirect: { to: '/blog/feed.json', statusCode: 301 },
      },
      '/mogelijk/api/event': {
        proxy: { to: 'https://plausible.io/api/event' },
      },
    },
  },
  runtimeConfig: {
    public: {
      datoApiToken: process.env.DATOCMS_API_READ_TOKEN,
      baseUrl: process.env.BASE_URL,
      previewSecret: process.env.PREVIEW_SECRET,
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
    'build:before': () =>
      Promise.all([
        fetchTranslations()
          .then(async (translations) => {
            await mkdir('.cache', { recursive: true });
            await writeFile(
              '.cache/ui-translations.json',
              JSON.stringify(translations),
            );
          }),
        fetchBlogFeed()
          .then(async (blogFeed) => {
            await mkdir('./src/public/blog', { recursive: true });
            await writeFile(
              './src/public/blog/feed.json',
              JSON.stringify(blogFeed),
            );
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
