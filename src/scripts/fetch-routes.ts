import { locales } from "../lib/i18n";
import { datocmsFetch } from '../lib/datocms-fetch';

const BLOG_PER_PAGE = 20;

type Filter = Record<string, any> | null;

type RouteConfig = {
  queryOperation: string;
  path: string;
  filter?: Filter;
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
  "/events/",
  "/energy-first/",
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
    queryOperation: "allPeople",
    path: "/meet/",
    filter: {
      meet: { exists: true },
    },
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
  {
    queryOperation: "allPages",
    path: "/",
  },
];

// fetches all routes for blog pages for a given locale
const fetchBlogPagesRoutes = async ({ locale }: { locale: string }) => {
  const operation = "allBlogPosts";
  const { data: meta } = await fetchMetaForOperation({ operation, locale });
  const { count } = meta[`_${operation}Meta`];
  const pages = Math.ceil(count / BLOG_PER_PAGE);
  return [...Array(pages)]
    .map((_, index) => index + 1)
    .filter((pageNumber) => pageNumber > 1)
    .map((pageNumber) => `/${locale}/blog/page/${pageNumber}/`);
};

// fetches a paginated list of slugs for a given operation
const fetchPaginatedSlugsForOperation = ({
  operation,
  filter,
  locale,
  skip,
}: {
  operation: string;
  locale: string;
  skip: number;
  filter?: Filter;
}) => {
  return datocmsFetch({
    query: `
        query ${operation}($skip: IntType, $locale: SiteLocale) {
            ${operation}(first: 100, skip: $skip, locale: $locale, filter: ${gqlFilter(
      filter
    )}) {
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
  locale: string;
  filter?: Filter;
}) => {
  return datocmsFetch({
    query: `
        query Meta ($locale: SiteLocale) {
            _${operation}Meta(locale: $locale, filter: ${gqlFilter(filter)}) {
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
  locale: string;
  filter?: Filter;
}) => {
  const { data: meta } = await fetchMetaForOperation({
    operation,
    locale,
    filter,
  });
  const { count } = meta[`_${operation}Meta`];
  const pages = Math.ceil(count / 100);

  return Promise.all(
    [...Array(pages)].map((_, index) =>
      fetchPaginatedSlugsForOperation({
        operation,
        filter,
        locale,
        skip: index * 100,
      })
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
    dynamicRoutesConfig.map(async ({ queryOperation, path, filter }) => {
      const slugs = await fetchSlugsForOperation({
        operation: queryOperation,
        filter,
        locale,
      });

      return (
        slugs
          // some slugs might not exist for some locales,
          // so we need to filter out any empty values
          .filter(Boolean)
          .map((slug) => `/${locale}${path}${slug}/`)
      );
    })
  ).then((data) => data.flat());
};

// converts an object to a string that can be used as a filter in a GraphQL query
function gqlFilter(obj?: Filter) {
  if (!obj) {
    return null;
  }

  var cleaned = JSON.stringify(obj, null, 2);

  return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
    return match.replace(/"/g, "");
  });
}

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
