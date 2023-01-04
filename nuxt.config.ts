import { defineNuxtConfig } from 'nuxt/config';
import { writeFile, mkdir } from 'node:fs/promises';
import { default as nuxtIcons } from 'nuxt-icons';
import { default as plausible } from '@nuxtjs/plausible';
import { fetchTranslations } from './src/scripts/fetch-translations.js';
import { fetchBlogFeed } from './src/scripts/fetch-blog-feed';

export default defineNuxtConfig({
  srcDir: 'src/client',
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
  hooks: {
    'build:before': () => Promise.all([
      fetchTranslations({ datoApiToken: process.env.DATO_API_TOKEN })
        .then(async (translations) => {
          await mkdir('.cache', { recursive: true });
          await writeFile('.cache/ui-translations.json', JSON.stringify(translations));
        }),
      fetchBlogFeed({ datoApiToken: process.env.DATO_API_TOKEN, baseUrl: process.env.BASE_URL })
        .then(async (blogFeed) => {
          await mkdir('./src/client/public/blog', { recursive: true });
          await writeFile('./src/client/public/blog/feed.json', JSON.stringify(blogFeed));
        }),
    ])
      // hook expects a promise with no return data
      .then(() => {}),
  },
});
