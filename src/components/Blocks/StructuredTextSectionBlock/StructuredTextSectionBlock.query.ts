import { graphql } from "~/utils/graphql";
import {
  GlossaryTermLinkFragment,
  BlueTextFragment,
  ButtonsListFragment,
  HighlightedListFragment,
  CounterItemListFragment,
  ImageBlockFragment,
  StructuredTextImageFragment,
  TwoColumnBlockFragment,
} from "../shared/structuredText.query";

export const StructuredTextSectionBlockFragment = graphql(
  `
    fragment StructuredTextSectionBlockFragment on SectionStructuredTextRecord {
      gridAlignment
      backgroundColor
      body {
        value
        links {
          ...GlossaryTermLinkFragment
        }
        blocks {
          __typename
          ...BlueTextFragment
          ...ButtonsListFragment
          ...HighlightedListFragment
          ...CounterItemListFragment
          ...ImageBlockFragment
          ...StructuredTextImageFragment
          ...TwoColumnBlockFragment
        }
      }
    }
  `,
  [
    GlossaryTermLinkFragment,
    BlueTextFragment,
    ButtonsListFragment,
    HighlightedListFragment,
    CounterItemListFragment,
    ImageBlockFragment,
    StructuredTextImageFragment,
    TwoColumnBlockFragment,
  ],
);
