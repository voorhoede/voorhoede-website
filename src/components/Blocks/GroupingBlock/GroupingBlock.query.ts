import { graphql } from "~/utils/graphql";
import { LogoGridBlockFragment } from "../LogoGridBlock/LogoGridBlock.query";
import { TextImageBlockFragment } from "../TextImageBlock/TextImageBlock.query";

export const GroupingItemFragment = graphql(
  `
    fragment GroupingItemFragment on GroupingItemRecord {
      id
      title
      sections {
        __typename
        ...LogoGridBlockFragment
        ...TextImageBlockFragment
      }
    }
  `,
  [LogoGridBlockFragment, TextImageBlockFragment],
);

export const GroupingBlockFragment = graphql(
  `
    fragment GroupingBlockFragment on SectionGroupingRecord {
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
