import { datocmsFetch } from "../lib/datocms-fetch";

const operationsWithTranslatedSlugs = [
  {
    route: "language-jobs-slug",
    operation: "allJobs",
  },
  {
    route: "language-services-slug",
    operation: "allServices",
  },
  {
    route: "language-cases-slug",
    operation: "allCaseItems",
  },
  {
    route: "language-blog-slug",
    operation: "allBlogPosts",
  },
  {
    route: "language-blog-tag-slug",
    operation: "allTags",
  },
];

// fetches a paginated list of slugs for a given operation
const fetchPaginatedTranslatedSlugsForOperation = ({
  operation,
  skip,
}: {
  operation: string;
  skip: number;
}) =>
  datocmsFetch({
    query: `
        query ${operation}($skip: IntType) {
            ${operation}(first: 100, skip: $skip) {
              id
              _allSlugLocales {
                locale
                value
              }
            }
        }
    `,
    variables: {
      skip,
    },
  }).then(({ data }) =>
    data[operation].map(
      ({ _allSlugLocales }: { _allSlugLocales: any }) => _allSlugLocales
    )
  );

// fetches the total number of items for a given operation
const fetchMetaForOperation = ({ operation }: { operation: string }) =>
  datocmsFetch({
    query: `
        query Meta {
            _${operation}Meta {
                count
            }
        }
    `,
  }).then(({ data }) => data);

// fetches all slugs for operation
const fetchTranslatedSlugsForOperation = async ({
  operation,
}: {
  operation: string;
}) => {
  const meta = await fetchMetaForOperation({ operation });
  const { count } = meta[`_${operation}Meta`];
  const pages = Math.ceil(count / 100);

  return Promise.all(
    [...Array(pages)].map((_, index) =>
      fetchPaginatedTranslatedSlugsForOperation({
        operation,
        skip: index * 100,
      })
    )
  );
};

export const fetchI18nSlugs = () =>
  Promise.all(
    operationsWithTranslatedSlugs.map(async ({ route, operation }) => ({
      route,
      slugs: (
        await fetchTranslatedSlugsForOperation({ operation: operation })
      ).flat(),
    }))
  );
