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

export const PageHeaderBlockFragment = graphql(
  `
    fragment PageHeaderBlockFragment on PageHeaderRecord {
      layout
      style
      title
      subtitle
      body {
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
      illustration {
        url
        alt
        width
        height
      }
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
