import { graphql } from "~/utils/graphql";

export const StructuredTextBlockFragment = graphql(`
  fragment StructuredTextBlockFragment on SectionStructuredTextRecord {
    id
    gridAlignment
    hasToc
    backgroundColor
    body {
      value
      links {
        __typename
        ... on GlossaryTermRecord {
          id
          term
          slug
          question
          definition
          definitionHtml: definition(markdown: true)
        }
      }
      blocks {
        __typename
        ... on StructuredTextBlueTextRecord {
          id
          variant
          textAlignment
          body {
            value
            links {
              __typename
              ... on GlossaryTermRecord {
                id
                term
                slug
                question
                definition
                definitionHtml: definition(markdown: true)
              }
            }
            blocks {
              __typename
              ... on StructuredTextButtonsListRecord {
                id
                buttons {
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
                    }
                  }
                }
              }
            }
          }
        }
        ... on StructuredTextButtonsListRecord {
          id
          buttons {
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
              }
            }
          }
        }
        ... on StructuredTextHighlightedListRecord {
          id
          items {
            body {
              value
              links {
                __typename
                ... on GlossaryTermRecord {
                  id
                  term
                  slug
                  question
                  definition
                  definitionHtml: definition(markdown: true)
                }
              }
            }
          }
        }
        ... on ImageRecord {
          id
          caption
          image {
            url
            alt
            width
            height
          }
          captionPosition
        }
      }
    }
  }
`);
