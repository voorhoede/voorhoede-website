import { defineNuxtConfig } from 'nuxt/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { default as plausible } from '@nuxtjs/plausible';
import { fetchTranslations } from './src/scripts/fetch-translations';
import { fetchBlogFeed } from './src/scripts/fetch-blog-feed';
import { fetchRedirects } from './src/scripts/fetch-redirects';
import { fetchI18nSlugs } from './src/scripts/fetch-i18n-slugs';
import { svgSymbolLoader } from './src/scripts/svg-symbol-loader';
import { htmlToMarkdown } from './src/scripts/html-to-markdown';
import { defaultLanguage } from './src/lib/i18n';
import { type Plugin } from 'vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-01-17',
  srcDir: 'src',
  // Disable confusing @ alias in favor of ~ alias
  alias: { '@': '' },
  css: ['@/components/app-core/index.css'],
  nitro: {
    rollupConfig: {
      plugins: [svgSymbolLoader() as Plugin],
    },
    // Cloudflare Pages: keep _routes.json excludes short/wildcarded so deploy
    // does not hit Error 8000057 (100-char rule limit).
    cloudflare: {
      pages: {
        routes: {
          exclude: [
            '/_nuxt/*',
            '/images/*',
            '/fonts/*',
            '/*.md',
            '/robots.txt',
            '/site.webmanifest',
            '/icon-sprite.svg',
            '/blog/feed.json',
          ],
        },
      },
    },
    prerender: {
      crawlLinks: true,
      routes: [`/${defaultLanguage}/`],
      concurrency: 35, // stay below 40 to avoid rate limiting
      interval: 1000, // use 1 second interval to avoid rate limiting
      failOnError: false,
      autoSubfolderIndex: false,
    },
    routeRules: {
      '/': { prerender: false },
      '/blog-feed.xml': {
        redirect: { to: '/blog/feed.json', statusCode: 301 },
      },
      '/icon-sprite.svg': {
        prerender: true,
      },
    },
  },
  runtimeConfig: {
    postmarkApiToken: process.env.POSTMARK_API_TOKEN,
    pipedriveApiToken: process.env.PIPEDRIVE_API_TOKEN,
    pipedriveApiUrl: process.env.PIPEDRIVE_API_URL,
    akismetApiToken: process.env.AKISMET_API_TOKEN,
    public: {
      datoApiToken: process.env.DATOCMS_API_READ_TOKEN,
      baseUrl: process.env.BASE_URL,
      originalUrl: process.env.ORIGINAL_URL,
      previewSecret: process.env.PREVIEW_SECRET,
    },
  },
  modules: [plausible],
  plausible: {
    proxy: true,
    proxyBaseEndpoint: '/mogelijk',
  },
  hooks: {
    'build:before': () =>
      Promise.all([
        fetchTranslations().then(async (translations) => {
          await mkdir('.cache', { recursive: true });
          await writeFile(
            '.cache/ui-translations.json',
            JSON.stringify(translations),
          );
        }),
        fetchBlogFeed().then(async (blogFeed) => {
          await mkdir('./src/public/blog', { recursive: true });
          await writeFile(
            './src/public/blog/feed.json',
            JSON.stringify(blogFeed),
          );
        }),
        fetchI18nSlugs().then(async (data) => {
          await mkdir('.cache', { recursive: true });
          await writeFile('.cache/i18n-slugs.json', JSON.stringify(data));
        }),
      ])
        // hook expects a promise with no return data
        .then(() => {}),
    'nitro:config': (nitroConfig) => {
      return fetchRedirects().then((redirectRules) => {
        redirectRules.forEach((redirectRule) => {
          nitroConfig.routeRules![redirectRule.from] = {
            redirect: {
              to: redirectRule.to,
              statusCode: redirectRule.statusCode,
            },
          };
        });
      });
    },
    'nitro:init'(nitro) {
      const publicDirUrl = new URL(`file://${nitro.options.output.publicDir}/`);
      const origin = process.env.BASE_URL ?? '';
      const CF_ROUTES_RULE_MAX_CHARS = 100;

      nitro.hooks.hook('prerender:generate', async (route) => {
        // Skip percent-encoded crawl artifacts (e.g. %2F) so they never land in
        // dist and inflate Cloudflare _routes.json excludes past 100 chars.
        if (route.route?.includes('%')) {
          route.skip = true;
          return;
        }

        if (
          !route.fileName?.endsWith('.html') ||
          typeof route.contents !== 'string'
        ) return;

        let markdown: string;
        try {
          markdown = await htmlToMarkdown({
            html: route.contents,
            url: route.route ?? '',
            origin,
          });
        } catch (error) {
          console.warn(`[markdown] failed to convert ${route.route}:`, error);
          return;
        }

        if (!markdown) return;

        const mdFileName = route.fileName.replace(/(?:\/index)?\.html$/, '.md');
        const outUrl = new URL(`.${mdFileName}`, publicDirUrl);
        await mkdir(new URL('.', outUrl), { recursive: true });
        await writeFile(outUrl, markdown, 'utf8');
      });

      // Runs after the cloudflare-pages preset writes _routes.json.
      nitro.hooks.hook('compiled', async () => {
        const { access, readFile, writeFile: writeRoutesFile } = await import(
          'node:fs/promises'
        );
        const { resolve } = await import('node:path');
        const routesPath = resolve(nitro.options.output.dir, '_routes.json');
        try {
          await access(routesPath);
        } catch {
          return;
        }

        const routes = JSON.parse(await readFile(routesPath, 'utf8')) as {
          version?: number;
          include?: string[];
          exclude?: string[];
        };
        const dropped = [...(routes.include ?? []), ...(routes.exclude ?? [])]
          .filter((rule) => rule.length > CF_ROUTES_RULE_MAX_CHARS)
          .map((rule) => ({ length: rule.length, rule: rule.slice(0, 80) }));

        routes.include = (routes.include ?? []).filter(
          (rule) => rule.length <= CF_ROUTES_RULE_MAX_CHARS,
        );
        routes.exclude = (routes.exclude ?? []).filter(
          (rule) => rule.length <= CF_ROUTES_RULE_MAX_CHARS,
        );
        if (!routes.include.length) {
          routes.include = ['/*'];
        }

        await writeRoutesFile(routesPath, JSON.stringify(routes, null, 2));

        // #region agent log
        fetch(
          'http://127.0.0.1:7378/ingest/bd12d82c-517b-4d1e-bd21-690bc7f58739',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Debug-Session-Id': '35a7f2',
            },
            body: JSON.stringify({
              sessionId: '35a7f2',
              runId: 'post-fix',
              hypothesisId: 'C',
              location: 'nuxt.config.ts:compiled:_routes.json',
              message: 'Sanitized Cloudflare _routes.json',
              data: {
                droppedCount: dropped.length,
                dropped,
                includeCount: routes.include.length,
                excludeCount: routes.exclude.length,
                maxExcludeLen: Math.max(
                  0,
                  ...routes.exclude.map((rule) => rule.length),
                ),
              },
              timestamp: Date.now(),
            }),
          },
        ).catch(() => {});
        // #endregion

        if (dropped.length) {
          nitro.logger.warn(
            `[cloudflare] Removed ${dropped.length} _routes.json rule(s) over ${CF_ROUTES_RULE_MAX_CHARS} chars`,
          );
        }
      });
    },
  },
});
