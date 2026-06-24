import { graphql } from "~/utils/graphql";

export const LinkToRecordFragment = graphql(`
  fragment LinkToRecordFragment on RecordInterface @_unmask {
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
`);
