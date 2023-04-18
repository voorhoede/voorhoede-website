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
    operation: "allServices",
  },
];

// fetches a paginated list of slugs for a given operation
const fetchPaginatedTranslatedSlugsForOperation = ({
  operation,
  skip,
}: {
  operation: string;
  skip: number;
}) => {
  return fetchDatoQuery({
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
  })
    .then((data) =>
      data[operation].map(
        ({ _allSlugLocales }: { _allSlugLocales: any }) => _allSlugLocales
      )
    );
};

// fetches the total number of items for a given operation
const fetchMetaForOperation = ({ operation }: { operation: string }) => {
  return fetchDatoQuery({
    query: `
        query Meta {
            _${operation}Meta {
                count
            }
        }
    `,
  });
};

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

export const fetchI18nSlugs = async () => {
  const test = await Promise.all(
    operationsWithTranslatedSlugs.map(async ({ route, operation }) => ({
      route,
      slugs: (await fetchTranslatedSlugsForOperation({ operation: operation })).flat(),
    }))
  );

  return test;
};
