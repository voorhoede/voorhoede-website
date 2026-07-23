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
        ... on EventRecord {
          slug
        }
        ... on HomePageRecord {
          id
        }
      }
    }
  }
`);
