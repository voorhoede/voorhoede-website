import { Client, fetchExchange } from '@urql/core';
import type { TadaDocumentNode } from 'gql.tada';
import { datocmsContentApiUrl, datocmsEnvironment } from '~/constants.mjs';

const client = new Client({
  url: datocmsContentApiUrl,
  exchanges: [fetchExchange],
});

export function useFetchDatocmsContent<
  Data = unknown,
  Variables extends Record<string, unknown> = Record<string, unknown>,
>({
  query,
  variables = {} as Variables,
  preview = false,
}: {
  query: TadaDocumentNode<Data, Variables>;
  variables?: Variables;
  preview?: boolean;
}) {
  const config = useRuntimeConfig();

  return client
    .query(query, variables, {
      fetchOptions: () => ({
        headers: {
          Authorization: String(config.public.datoApiToken),
          'X-Exclude-Invalid': 'true',
          'X-Environment': datocmsEnvironment,
          ...(preview ? { 'X-Include-Drafts': 'true' } : {}),
        },
      }),
    })
    .toPromise();
}
