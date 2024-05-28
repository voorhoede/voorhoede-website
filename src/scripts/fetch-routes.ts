import { locales } from "../lib/i18n";
import { datocmsFetch } from '../lib/datocms-fetch';

const BLOG_PER_PAGE = 20;

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
  {
    queryOperation: "allTags",
    path: "/blog/tag/",
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

// fetches all routes for blog tags for a given locale
// this needs a separate function because we need to fetch the tag ID for each tag
// and then calculate the number of pages based on the number of blog posts with that tag
const fetchBlogTagRoutes = async ({ locale }: { locale: string }) => {
  const operation = "allTags";
  const slugs = await fetchSlugsForOperation({ operation, locale });
  return Promise.all(
    slugs.map(async (slug) => {
      const tagId = await datocmsFetch({
        query: `
          query TagId($locale: SiteLocale, $slug: String) {
            tag(locale: $locale, filter: { slug: { eq: $slug } }) {
              id
            }
          }
        `,
        variables: {
          locale,
          slug,
        },
      }).then(({ data }) => data.tag.id);

      const { data: meta } = await fetchMetaForOperation({
        operation: "allBlogPosts",
        locale,
        filter: `{ tags: { anyIn: ["${tagId}"] } }`,
      });

      const { count } = meta[`_allBlogPostsMeta`];

      const pages = Math.ceil(count / BLOG_PER_PAGE);

      const paginatedRoutes = [...Array(pages)]
        .map((_, index) => index + 1)
        .filter((pageNumber) => pageNumber > 1)
        .map((pageNumber) => `/${locale}/blog/tag/${slug}/page/${pageNumber}/`);

      return [`/${locale}/blog/tag/${slug}/`, ...paginatedRoutes];
    })
  ).then((data) => data.flat());
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
  return datocmsFetch({
    query: `
        query ${operation}($skip: IntType, $locale: SiteLocale) {
            ${operation}(first: 100, skip: $skip, locale: $locale) {
                id
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
  locale,
  filter = null,
}: {
  operation: string;
  locale: string;
  filter?: string | null;
}) => {
  return datocmsFetch({
    query: `
        query Meta ($locale: SiteLocale) {
            _${operation}Meta(locale: $locale, filter: ${filter}) {
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
  const { data: meta } = await fetchMetaForOperation({ operation, locale });
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
        const blogTagRoutes = await fetchBlogTagRoutes({ locale });

        return [
          ...staticRoutesConfig.map((route) => `/${locale}${route}`),
          ...dynamicRoutes,
          ...blogRoutes,
          ...blogTagRoutes,
        ];
      })
  ).then((data) => data.flat());
