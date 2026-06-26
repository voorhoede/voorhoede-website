import { graphql } from "~/utils/graphql";

export const TextBlockFragment = graphql(
  `
    fragment TextBlockFragment on TextBlockRecord {
      text {
        value
        links {
          __typename
          ... on HomePageRecord {
            id
            title
          }
          ... on PageRecord {
            id
            slug
            title
          }
        }
      }
      layout
      style
    }
  `,
  [],
);
