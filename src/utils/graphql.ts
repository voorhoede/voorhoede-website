import { initGraphQLTada } from 'gql.tada';
import type { introspection } from '#shared/generated/graphql-env.d.ts';

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
export { readFragment } from 'gql.tada';

export const graphql = initGraphQLTada<{
  introspection: introspection;
  // scalars from https://www.datocms.com/docs/content-delivery-api/custom-scalar-types
  scalars: {
    BooleanType: boolean;
    CustomData: Record<string, string>;
    Date: string;
    DateTime: string;
    FloatType: number;
    IntType: number;
    ItemId: string;
    JsonField: unknown;
    MetaTagAttributes: Record<string, string>;
    UploadId: string;
  };
}>();
