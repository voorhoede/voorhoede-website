import { graphql } from "~/utils/graphql";

export const InterstitialCtaFragment = graphql(`
  fragment InterstitialCtaFragment on SectionInterstitialCtaRecord {
    id
    title
    backgroundColor
    ctas {
      __typename
      ... on ExternalLinkRecord {
        id
        title
        url
        style
      }
      ... on InternalLinkRecord {
        id
        title
        style
        link {
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
          ... on EventItemRecord {
            slug
          }
          ... on JobRecord {
            slug
          }
          ... on ServiceRecord {
            slug
          }
          ... on PersonRecord {
            slug
          }
          ... on MeetRecord {
            parents: _allReferencingPeople {
              __typename
              slug
            }
          }
          ... on ContactRecord {
            id
          }
        }
      }
    }
  }
`);
