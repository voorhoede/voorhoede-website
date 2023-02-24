const x = {
  "data": {
    "languageJobsSlug": [
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "internship"
          },
          {
            "locale": "nl",
            "slug": "stageplek"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "collaborativeinternship"
          },
          {
            "locale": "nl",
            "slug": "meewerkstage"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "front-end-developer"
          },
          {
            "locale": "nl",
            "slug": "front-end-developer"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "medior-front-end-developer"
          },
          {
            "locale": "nl",
            "slug": "medior-front-end-developer"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "senior-front-end-developer"
          },
          {
            "locale": "nl",
            "slug": "senior-front-end-developer"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "online-marketeer"
          },
          {
            "locale": "nl",
            "slug": "online-marketeer"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "senior-back-end-developer"
          },
          {
            "locale": "nl",
            "slug": "senior-back-end-developer"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "digitaal-projectmanager"
          },
          {
            "locale": "nl",
            "slug": "digitaal-projectmanager"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "lead-front-end-developer"
          },
          {
            "locale": "nl",
            "slug": "lead-front-end-developer"
          }
        ]
      },
      {
        "_allSlugLocales": [
          {
            "locale": "en",
            "slug": "sales-engineer"
          },
          {
            "locale": "nl",
            "slug": "sales-engineer"
          },
					{
						"locale": "it",
						"slug": "derp"
					}
        ]
      }
    ]
  }
};

/*
const i18nSlugs = {
  'language-services-slug': {
    en: {
      'validate-your-idea': { nl: { slug: 'jouw-idee-valideren' } },
      'launch-your-product': { nl: { slug: 'jouw-product-lanceren' } },
    },
    nl: {
      'jouw-idee-valideren': { en: { slug: 'validate-your-idea' } },
      'jouw-product-lanceren': { en: { slug: 'launch-your-product' } },
    },
}
*/

import { kebabCase } from 'scule';

const locales = ["en", "nl"];

const output = Object.fromEntries(
  Object.entries(x.data).map(([routeName, routeData]) => [
    [kebabCase(routeName)],
    Object.fromEntries(
      locales.map((code) => [
        code,
        Object.fromEntries(
          routeData.map(({ _allSlugLocales }) => [
            _allSlugLocales.find((y) => y.locale === code).slug,
            Object.fromEntries(
              _allSlugLocales
                .filter((slugLocales) => slugLocales.locale !== code)
                .map((slugLocales) => [slugLocales.locale, slugLocales.slug])
            ),
          ])
        ),
      ])
    ),
  ])
);

console.log(JSON.stringify(output, null, 2))
