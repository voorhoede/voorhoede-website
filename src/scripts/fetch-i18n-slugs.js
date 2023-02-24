import { kebabCase } from 'scule';
import { locales } from '../lib/i18n.js';

export const fetchI18nSlugs = ({ datoApiToken }) => (
  fetch(`https://graphql.datocms.com/`, {
    method: 'post',
    headers: { 'authorization': datoApiToken },
    body: JSON.stringify({
      query: `
        query TranslationSlugs {
          languageServicesSlug: allServices(first: 100) {
            _allSlugLocales {
              locale
              slug: value
            }
          }
          languageJobsSlug: allJobs(first: 100) {
            _allSlugLocales {
              locale
              slug: value
            }
          }
          languageCasesSlug: allCaseItems(first: 100) {
            _allSlugLocales {
              locale
              slug: value
            }
          }
        }
      `,
    }),
  })
    .then(response => response.json())
    .then(({ data }) => {
      console.log(data)
      return Object.fromEntries(
        Object.entries(data).map(([routeName, routeData]) => [
          [kebabCase(routeName)],
          Object.fromEntries(
            locales.map(({ code }) => [
              code,
              Object.fromEntries(
                routeData.map(({ _allSlugLocales }) => [
                  _allSlugLocales.find((slugLocale) => slugLocale.locale === code).slug,
                  Object.fromEntries(
                    _allSlugLocales
                      .filter((slugLocale) => slugLocale.locale !== code)
                      .map((slugLocale) => [slugLocale.locale, slugLocale.slug])
                  ),
                ])
              ),
            ])
          ),
        ])
      );
    })
);

fetchI18nSlugs({ datoApiToken: process.env.DATO_API_TOKEN })
  .then(async (x) => {
    await mkdir('.cache', { recursive: true });
    await writeFile('.cache/ui-translations.json', JSON.stringify(x));
  })
