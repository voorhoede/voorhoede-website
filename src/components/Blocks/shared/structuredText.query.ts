import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

/**
 * Shared fragments for DatoCMS structured-text content rendered by
 * `structured-text-block`. The `body` wrapper (value/links/blocks) must be
 * written inline per parent record because each record's body field is a
 * distinct GraphQL type, but these leaf block fragments are reusable.
 */

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

export const ButtonsListFragment = graphql(
  `
    fragment ButtonsListFragment on StructuredTextButtonsListRecord {
      id
      buttons {
        ...LinkToRecordFragment
      }
    }
  `,
  [LinkToRecordFragment],
);

export const BlueTextFragment = graphql(
  `
    fragment BlueTextFragment on StructuredTextBlueTextRecord {
      id
      variant
      textAlignment
      body {
        value
        links {
          ...GlossaryTermLinkFragment
        }
        blocks {
          __typename
          ...ButtonsListFragment
        }
      }
    }
  `,
  [GlossaryTermLinkFragment, ButtonsListFragment],
);

export const HighlightedListFragment = graphql(
  `
    fragment HighlightedListFragment on StructuredTextHighlightedListRecord {
      id
      items {
        body {
          value
          links {
            ...GlossaryTermLinkFragment
          }
        }
      }
    }
  `,
  [GlossaryTermLinkFragment],
);

export const CounterItemListFragment = graphql(`
  fragment CounterItemListFragment on StructuredTextCounterItemListRecord {
    id
    items {
      id
      amount
      label
    }
  }
`);

export const ImageBlockFragment = graphql(`
  fragment ImageBlockFragment on ImageRecord {
    id
    caption
    captionPosition
    image {
      url
      alt
      width
      height
    }
  }
`);

export const StructuredTextImageFragment = graphql(`
  fragment StructuredTextImageFragment on StructuredTextImageRecord {
    id
    caption
    image {
      url
      alt
      width
      height
    }
  }
`);

export const TwoColumnItemFragment = graphql(
  `
    fragment TwoColumnItemFragment on RecordInterface {
      __typename
      ... on StructuredTextRecord {
        id
        body {
          value
          links {
            ...GlossaryTermLinkFragment
          }
          blocks {
            __typename
            ...ButtonsListFragment
          }
        }
      }
      ... on StructuredTextImageRecord {
        ...StructuredTextImageFragment
      }
    }
  `,
  [GlossaryTermLinkFragment, ButtonsListFragment, StructuredTextImageFragment],
);

export const TwoColumnBlockFragment = graphql(
  `
    fragment TwoColumnBlockFragment on TwoColumnBlockRecord {
      id
      leftItems {
        ...TwoColumnItemFragment
      }
      rightItems {
        ...TwoColumnItemFragment
      }
    }
  `,
  [TwoColumnItemFragment],
);
