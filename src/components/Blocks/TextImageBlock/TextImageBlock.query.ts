import { graphql } from "~/utils/graphql";
import {
  ActionBlockFragment,
  GlossaryTermLinkFragment,
  IconBlockFragment,
  ImageBlockFragment,
  VariableBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "~/components/Blocks/shared/structuredText.query";

export const TextImageBlockFragment = graphql(
  `
    fragment TextImageBlockFragment on TextImageBlockRecord {
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
          ...VideoBlockFragment
          ...VideoEmbedBlockFragment
        }
        inlineBlocks {
          __typename
          ...IconBlockFragment
          ...VariableBlockFragment
        }
      }
      image {
        url
        alt
        width
        height
      }
      layout
      style
    }
  `,
  [
    ActionBlockFragment,
    GlossaryTermLinkFragment,
    IconBlockFragment,
    ImageBlockFragment,
    VariableBlockFragment,
    VideoBlockFragment,
    VideoEmbedBlockFragment,
  ],
);
