import { graphql } from "~/utils/graphql";
import { LogoGridFragment } from "../LogoGrid/LogoGrid.query";
import { TextImageFragment } from "../TextImage/TextImage.query";

export const GroupingItemFragment = graphql(
  `fragment GroupingItemFragment on GroupingItemRecord {
      id
      title
      sections {
        __typename
        ...LogoGridFragment
        ...TextImageFragment
      }
    }`,
  [LogoGridFragment, TextImageFragment],
);

export const GroupingFragment = graphql(
  `fragment GroupingFragment on SectionGroupingRecord {
      __typename
      id
      theme
      accentPosition
      items {
        ...GroupingItemFragment
      }
    }`,
  [GroupingItemFragment],
);
