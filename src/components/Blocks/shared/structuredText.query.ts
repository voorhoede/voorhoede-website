import { graphql } from "~/utils/graphql";

/** ST embed fragment — field-aligned with ActionBlockRecordFragment for ActionBlock.vue reuse. */
export const ActionBlockFragment = graphql(`
  fragment ActionBlockFragment on ActionBlockRecord {
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

export const VideoBlockFragment = graphql(`
  fragment VideoBlockFragment on VideoBlockRecord {
    id
    title
    autoplay
    mute
    loop
    videoAsset {
      video {
        muxPlaybackId
        title: alt
        width
        height
        blurUpThumb
      }
    }
  }
`);

export const VideoEmbedBlockFragment = graphql(`
  fragment VideoEmbedBlockFragment on VideoEmbedBlockRecord {
    id
    caption
    autoplay
    mute
    loop
    video {
      url
      title
      provider
      providerUid
      width
      height
      thumbnailUrl
    }
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
