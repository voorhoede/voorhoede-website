import { graphql } from "~/utils/graphql";
import {
  ButtonsListFragment,
  CounterItemListFragment,
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
        }
        blocks {
          __typename
          ...ButtonsListFragment
          ...CounterItemListFragment
          ...HighlightedListFragment
          ...ImageFragment
        }
      }
      layout
      style
    }
  `,
  [
    ButtonsListFragment,
    CounterItemListFragment,
    HighlightedListFragment,
    ImageFragment,
  ],
);
