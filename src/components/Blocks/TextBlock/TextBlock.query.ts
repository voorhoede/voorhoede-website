import { graphql } from "~/utils/graphql";
import {
  ActionBlockFragment,
  CounterBlockFragment,
  GlossaryTermLinkFragment,
  IconBlockFragment,
  ImageBlockFragment,
  ListBlockFragment,
  VariableBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
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
          ... on FileRecord {
            id
            title
            file {
              url
            }
          }
          ...GlossaryTermLinkFragment
        }
        blocks {
          __typename
          ...ActionBlockFragment
          ...ImageBlockFragment
          ...ListBlockFragment
          ...VideoBlockFragment
          ...VideoEmbedBlockFragment
        }
        inlineBlocks {
          __typename
          ...CounterBlockFragment
          ...IconBlockFragment
          ...VariableBlockFragment
        }
      }
    }
  `,
  [
    ActionBlockFragment,
    CounterBlockFragment,
    GlossaryTermLinkFragment,
    IconBlockFragment,
    ImageBlockFragment,
    ListBlockFragment,
    VariableBlockFragment,
    VideoBlockFragment,
    VideoEmbedBlockFragment,
  ],
);
