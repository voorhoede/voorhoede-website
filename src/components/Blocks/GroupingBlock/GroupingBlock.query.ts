import { graphql } from "~/utils/graphql";
import { TextImageBlockFragment } from "../TextImageBlock/TextImageBlock.query";
import { TextBlockFragment } from "../TextBlock/TextBlock.query";
import { CaseListBlockFragment } from "../CaseListBlock/CaseListBlock.query";
import { ReachOutBlockFragment } from "../ReachOutBlock/ReachOutBlock.query";
import { TeamGalleryBlockFragment } from "../TeamGalleryBlock/TeamGalleryBlock.query";

export const GroupingItemFragment = graphql(
  `
    fragment GroupingItemFragment on GroupingItemRecord {
      id
      title
      sections {
        __typename
        ...CaseListBlockFragment
        ...ReachOutBlockFragment
        ...TeamGalleryBlockFragment
        ...TextBlockFragment
        ...TextImageBlockFragment
      }
    }
  `,
  [
    CaseListBlockFragment,
    ReachOutBlockFragment,
    TeamGalleryBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
  ],
);

export const GroupingBlockFragment = graphql(
  `
    fragment GroupingBlockFragment on GroupingBlockRecord {
      __typename
      id
      theme
      accentPosition
      items {
        ...GroupingItemFragment
      }
    }
  `,
  [GroupingItemFragment],
);
