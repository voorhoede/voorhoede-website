import { locales } from "../lib/i18n";
import { datocmsFetch } from "../lib/datocms-fetch";

type QueryFilter =  Record<string, any>;

type RouteConfig = {
  queryOperation: string;
  path: string;
  filter?: QueryFilter;
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

// JSON.stringify adds quotes around object keys, which is not valid GraphQL syntax
// this function removes the quotes of object keys
const toGqlFilter = (filter: QueryFilter) => JSON.stringify(filter).replace(/"(\w+)"\s*:/g, '$1:');

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
    filter: { published: { eq: true } },
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
    filter: { published: { eq: true } },
  },
  {
    queryOperation: "allContactConfirmations",
    path: "/contact/",
  },
  {
    queryOperation: "allJobs",
    path: "/jobs/",
    filter: { published: { eq: true } },
  },
];

// fetches a paginated list of slugs for a given operation
const fetchPaginatedSlugsForOperation = ({
  operation,
  filter,
  locale,
  skip,
}: {
  operation: string;
  filter: QueryFilter;
  locale: string;
  skip: number;
}) => {
  return datocmsFetch({
    query: `
        query ${operation}($skip: IntType, $locale: SiteLocale) {
            ${operation}(first: 100, skip: $skip, locale: $locale, filter: ${toGqlFilter(filter)}) {
                slug
            }
        }
    `,
    variables: {
      locale,
      skip,
    },
  }).then(({ data }) => data[operation]);
};

// fetches the total number of items for a given operation
const fetchMetaForOperation = ({
  operation,
  filter,
  locale,
}: {
  operation: string;
  filter: QueryFilter;
  locale: string;
}) => {
  return datocmsFetch({
    query: `
        query Meta ($locale: SiteLocale) {
            _${operation}Meta(locale: $locale, filter: ${toGqlFilter(filter)}) {
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
  filter,
  locale,
}: {
  operation: string;
  filter: QueryFilter;
  locale: string;
}) => {
  const { data: meta } = await fetchMetaForOperation({ operation, filter, locale });
  const { count } = meta[`_${operation}Meta`];
  const pages = Math.ceil(count / 100);

  return Promise.all(
    [...Array(pages)].map((_, index) =>
      fetchPaginatedSlugsForOperation({ operation, filter, locale, skip: index * 100 })
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
    dynamicRoutesConfig.map(async ({ queryOperation, filter = {}, path }) => {
      const slugs = await fetchSlugsForOperation({
        operation: queryOperation,
        filter,
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

        return [
          ...staticRoutesConfig.map((route) => `/${locale}${route}`),
          ...dynamicRoutes,
        ];
      })
  ).then((data) => data.flat());
