import { graphql } from "~/utils/graphql";

export const ImageWithTextFragment = graphql(`
  fragment ImageWithTextFragment on SectionImageTextRecord {
    id
    title
    image {
      url
      alt
      width
      height
    }
    imagePosition
    backgroundColor
    fontSize
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
      }
    }
  }
`);
