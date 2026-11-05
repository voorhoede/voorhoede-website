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
import { ActionBlockFragment as ActionBlockRecordFragment } from "../ActionBlock/ActionBlock.query";

export const ReachOutBlockFragment = graphql(
  `
    fragment ReachOutBlockFragment on ReachOutBlockRecord {
      title
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
      formType
      cta {
        ...ActionBlockRecordFragment
      }
      contactPerson {
        name
        lastName
        jobTitle
        image {
          url
          alt
          width
          height
        }
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
    ActionBlockRecordFragment,
  ],
);
