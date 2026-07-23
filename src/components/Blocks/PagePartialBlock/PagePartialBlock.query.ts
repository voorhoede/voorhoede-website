import { graphql } from "~/utils/graphql";
import { CaseListBlockFragment } from "../CaseListBlock/CaseListBlock.query";
import { GroupingBlockFragment } from "../GroupingBlock/GroupingBlock.query";
import { LogoGridBlockFragment } from "../LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "../PageHeaderBlock/PageHeaderBlock.query";
import { ReachOutBlockFragment } from "../ReachOutBlock/ReachOutBlock.query";
import { TextBlockFragment } from "../TextBlock/TextBlock.query";
import { TextImageBlockFragment } from "../TextImageBlock/TextImageBlock.query";

export const PagePartialBlockFragment = graphql(
  `
    fragment PagePartialBlockFragment on PagePartialBlockRecord {
      __typename
      id
      layout
      theme
      item {
        id
        title
        blocks {
          __typename
          ...CaseListBlockFragment
          ...GroupingBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...ReachOutBlockFragment
          ...TextBlockFragment
          ...TextImageBlockFragment
        }
      }
    }
  `,
  [
    CaseListBlockFragment,
    GroupingBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    ReachOutBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
  ],
);
