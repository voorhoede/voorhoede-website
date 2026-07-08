import { graphql } from "~/utils/graphql";
import {
  ButtonsListFragment,
  CounterItemListFragment,
  GlossaryTermLinkFragment,
  HighlightedListFragment,
  ImageFragment,
} from "~/components/Blocks/shared/structuredText.query";

export const TextBlockFragment = graphql(
  `
    fragment TextBlockFragment on TextBlockRecord {
      text {
        value
        links {
          __typename
          ... on HomePageRecord {
            id
            title
          }
          ... on PageRecord {
            id
            slug
            title
          }
          ...GlossaryTermLinkFragment
        }
        blocks {
          __typename
          ...ButtonsListFragment
          ...CounterItemListFragment
          ...HighlightedListFragment
          ...ImageFragment
        }
      }
    }
  `,
  [
    ButtonsListFragment,
    CounterItemListFragment,
    GlossaryTermLinkFragment,
    HighlightedListFragment,
    ImageFragment,
  ],
);
