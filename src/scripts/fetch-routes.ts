import { locales } from "../lib/i18n";

type RouteConfig = {
  queryOperation: string;
  path: string;
};

type Locale = {
  code: string;
  name: string;
};

// these route are static and will not need any further processing
const staticRoutesConfig = [
  "/",
  "/blog/",
  "/services/",
  "/contact/",
  "/cases/",
  "/jobs/",
  "/work-at/",
  "/lustrum/",
  "/events/",
  "/faq/",
  "/energy-first/",
  "/about-us/",
];

// these routes are generated dynamically by fetching all slugs for each page type
// the slugs are appended to the value of the 'baseRoute' property
const dynamicRoutesConfig: RouteConfig[] = [
  {
    queryOperation: "allServices",
    path: "/services/",
  },
  {
    queryOperation: "allBlogPosts",
    path: "/blog/",
  },
  {
    queryOperation: "allCaseItems",
    path: "/cases/",
  },
  {
    queryOperation: "allPeople",
    path: "/team/",
  },
  {
    queryOperation: "allEventItems",
    path: "/events/",
  },
  {
    queryOperation: "allContactConfirmations",
    path: "/contact/",
  },
  {
    queryOperation: "allJobs",
    path: "/jobs/",
  },
];

// fetches data from DatoCMS using the GraphQL API
const fetchDatoQuery = ({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}) => {
  return fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: process.env.DATO_API_TOKEN,
    } as HeadersInit,
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((res) => res.json())
    .then(({ data, errors }) => {
      if (errors) {
        console.log(errors);
      }

      return data;
    });
};

const fetchBlogPagesRoutes = async ({ locale } : { locale: string }) => {
  const operation = "allBlogPosts";
  const meta = await fetchMetaForOperation({ operation, locale });
  const { count } = meta[`_${operation}Meta`];
  const pages = Math.ceil(count / 20);
  return  [...Array(pages)].map((_, index) => `/${locale}/blog/page/${index + 1}/`);
};

// fetches a paginated list of slugs for a given operation
const fetchPaginatedSlugsForOperation = ({
  operation,
  locale,
  skip,
}: {
  operation: string;
  locale: string;
  skip: number;
}) => {
  return fetchDatoQuery({
    query: `
        query ${operation}($skip: IntType, $locale: SiteLocale) {
            ${operation}(first: 100, skip: $skip, locale: $locale) {
                slug
            }
        }
    `,
    variables: {
      locale,
      skip,
    },
  }).then((data) => data[operation]);
};

// fetches the total number of items for a given operation
const fetchMetaForOperation = ({
  operation,
  locale,
}: {
  operation: string;
  locale: string;
}) => {
  return fetchDatoQuery({
    query: `
        query Meta ($locale: SiteLocale) {
            _${operation}Meta(locale: $locale) {
                count
            }
        }
    `,
    variables: {
      locale,
    },
  });
};

// fetches all slugs for operation
const fetchSlugsForOperation = async ({
  operation,
  locale,
}: {
  operation: string;
  locale: string;
}) => {
  const meta = await fetchMetaForOperation({ operation, locale });
  const { count } = meta[`_${operation}Meta`];
  const pages = Math.ceil(count / 100);

  return Promise.all(
    [...Array(pages)].map((_, index) =>
      fetchPaginatedSlugsForOperation({ operation, locale, skip: index * 100 })
    )
  ).then((data) => data.flat().map((data) => data.slug));
};

// fetches all routes for a given locale
const fetchDynamicRoutes = ({
  locale,
  dynamicRoutesConfig,
}: {
  locale: string;
  dynamicRoutesConfig: RouteConfig[];
}) => {
  return Promise.all(
    dynamicRoutesConfig.map(async ({ queryOperation, path }) => {
      const slugs = await fetchSlugsForOperation({
        operation: queryOperation,
        locale,
      });

      return slugs.map((slug) => `/${locale}${path}${slug}/`);
    })
  ).then((data) => data.flat());
};

export const fetchRoutes = () =>
  Promise.all(
    locales
      .map((locale: Locale) => locale.code)
      .map(async (locale: string) => {
        const dynamicRoutes = await fetchDynamicRoutes({
          locale,
          dynamicRoutesConfig,
        });

        const blogRoutes = await fetchBlogPagesRoutes({ locale });

        return [
          ...staticRoutesConfig.map((route) => `/${locale}${route}`),
          ...dynamicRoutes,
          ...blogRoutes,
        ];
      })
  ).then((data) => data.flat());
