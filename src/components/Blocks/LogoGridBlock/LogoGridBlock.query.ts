import { graphql } from "~/utils/graphql";

export const LogoGridBlockFragment = graphql(`
  fragment LogoGridBlockFragment on LogoGridRecord {
    title
    logos {
      ... on MenuItemExternalRecord {
        __typename
        id
        externalTitle: title
        externalUrl: link
        image {
          url
          alt
          width
          height
        }
      }
      ... on MenuItemInternalRecord {
        __typename
        id
        internalTitle: title
        image {
          url
          alt
          width
          height
        }
        internalLink: link {
          __typename
          ... on PageRecord {
            slug
          }
          ... on BlogPostRecord {
            slug
          }
          ... on CaseItemRecord {
            slug
          }
          ... on EventRecord {
            slug
          }
          ... on HomePageRecord {
            id
          }
        }
      }
    }
  }
`);
