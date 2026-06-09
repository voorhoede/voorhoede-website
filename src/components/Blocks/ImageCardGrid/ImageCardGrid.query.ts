import { graphql } from "~/utils/graphql";

export const ImageCardGridFragment = graphql(`
  fragment ImageCardGridFragment on SectionImageCardGridRecord {
    title
    backgroundColor
    cardOrientation
    items {
      id
      title
      body {
        value
      }
      image {
        url
        alt
        width
        height
      }
      links {
        __typename
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
        ... on ExternalLinkRecord {
          id
          title
          url
          style
        }
      }
    }
  }
`);
