import { defineNuxtConfig } from 'nuxt/config';
import { writeFile, mkdir } from 'node:fs/promises';
import { default as nuxtIcons } from 'nuxt-icons';
import { default as plausible } from '@nuxtjs/plausible';
import { fetchTranslations } from './src/scripts/fetch-translations';
import { fetchBlogFeed } from './src/scripts/fetch-blog-feed';
import { fetchRedirects } from './src/scripts/fetch-redirects';

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
      routes: ['/en/', '/nl/'],
    }
  },
  runtimeConfig: {
    public: {
      datoApiToken: process.env.DATO_API_TOKEN,
      baseUrl: process.env.BASE_URL,
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
    'build:before': () => Promise.all([
      fetchTranslations({ datoApiToken: process.env.DATO_API_TOKEN })
        .then(async (translations) => {
          await mkdir('.cache', { recursive: true });
          await writeFile('.cache/ui-translations.json', JSON.stringify(translations));
        }),
      fetchBlogFeed({ datoApiToken: process.env.DATO_API_TOKEN, baseUrl: process.env.BASE_URL })
        .then(async (blogFeed) => {
          await mkdir('./src/public/blog', { recursive: true });
          await writeFile('./src/public/blog/feed.json', JSON.stringify(blogFeed));
        }),
      fetchRedirects({ datoApiToken: process.env.DATO_API_TOKEN })
        .then((redirects) => writeFile('./src/public/_redirects', redirects)),
    ])
      // hook expects a promise with no return data
      .then(() => {}),
  },
});
