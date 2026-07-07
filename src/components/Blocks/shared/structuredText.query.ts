import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

/**
 * Shared fragments for DatoCMS structured-text content rendered by
 * `structured-text-block`. The `body` wrapper (value/links/blocks) must be
 * written inline per parent record because each record's body field is a
 * distinct GraphQL type, but these leaf block fragments are reusable.
 */

// References
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

// Blocks
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

export const ImageFragment = graphql(`
  fragment ImageFragment on ImageRecord {
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
