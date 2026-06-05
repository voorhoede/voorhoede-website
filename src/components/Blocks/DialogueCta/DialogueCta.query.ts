import { graphql } from "~/utils/graphql";

export const DialogueCtaFragment = graphql(`
  fragment DialogueCtaFragment on SectionDialogueCtaRecord {
    variant
    title
    body(markdown: true)
    backgroundColor
    person {
      image {
        url
        alt
        width
        height
      }
    }
    ctas {
      ...link
    }
  }

  fragment link on RecordInterface {
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
`);
