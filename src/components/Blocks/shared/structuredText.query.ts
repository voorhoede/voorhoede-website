import { graphql } from "~/utils/graphql";

export const ActionBlockFragment = graphql(`
  fragment ActionBlockFragment on ActionBlockRecord {
    id
    items {
      __typename
      ... on ExternalLinkRecord {
        id
        title
        url
        externalStyle: style
      }
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
      ... on EmailLinkRecord {
        id
        title
        emailAddress
        emailStyle: style
      }
      ... on PhoneLinkRecord {
        id
        title
        phoneNumber
        phoneStyle: style
      }
    }
  }
`);

export const GlossaryTermLinkFragment = graphql(`
  fragment GlossaryTermLinkFragment on RecordInterface {
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
`);

export const ImageBlockFragment = graphql(`
  fragment ImageBlockFragment on ImageBlockRecord {
    id
    caption
    captionPosition
    fullWidth
    image {
      url
      alt
      width
      height
      author
      title
    }
  }
`);

export const ListBlockFragment = graphql(`
  fragment ListBlockFragment on ListBlockRecord {
    id
    listType
    startNumber
    items {
      id
      body
    }
  }
`);

export const VideoBlockFragment = graphql(`
  fragment VideoBlockFragment on VideoBlockRecord {
    id
    title
    autoplay
    mute
    loop
  }
`);

export const VideoEmbedBlockFragment = graphql(`
  fragment VideoEmbedBlockFragment on VideoEmbedBlockRecord {
    id
    caption
    autoplay
    mute
    loop
  }
`);

export const CounterBlockFragment = graphql(`
  fragment CounterBlockFragment on CounterBlockRecord {
    id
    amount
    label
  }
`);

export const IconBlockFragment = graphql(`
  fragment IconBlockFragment on IconBlockRecord {
    id
    name
    title
  }
`);

export const VariableBlockFragment = graphql(`
  fragment VariableBlockFragment on VariableBlockRecord {
    id
    variable {
      title
      value
      displayTitle
    }
  }
`);
