import { graphql } from "~/utils/graphql";

/** Distinct GraphQL name from shared/structuredText ActionBlockFragment (ST embeds). */
export const ActionBlockFragment = graphql(`
  fragment ActionBlockRecordFragment on ActionBlockRecord {
    id
    items {
      __typename
      ... on InternalLinkRecord {
        id
        title
        internalStyle: style
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
      ... on ExternalLinkRecord {
        id
        title
        url
        externalStyle: style
        openInNewTab
      }
      ... on EmailLinkRecord {
        id
        title
        emailAddress
        emailSubject
        emailBody
        emailStyle: style
      }
      ... on PhoneLinkRecord {
        id
        title
        phoneNumber
        action
        text
        phoneStyle: style
      }
    }
  }
`);
