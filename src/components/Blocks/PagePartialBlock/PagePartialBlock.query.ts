import { graphql } from "~/utils/graphql";
import { ActionBlockFragment } from "../ActionBlock/ActionBlock.query";
import { EventsListBlockFragment } from "../EventsListBlock/EventsListBlock.query";
import { GroupingBlockFragment } from "../GroupingBlock/GroupingBlock.query";
import { ImageGridBlockFragment } from "../ImageGridBlock/ImageGridBlock.query";
import { LogoGridBlockFragment } from "../LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "../PageHeaderBlock/PageHeaderBlock.query";
import { PageListBlockFragment } from "../PageListBlock/PageListBlock.query";
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
          ...ActionBlockRecordFragment
          ...EventsListBlockFragment
          ...GroupingBlockFragment
          ...ImageGridBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...PageListBlockFragment
          ...ReachOutBlockFragment
          ...TextBlockFragment
          ...TextImageBlockFragment
        }
      }
    }
  `,
  [
    ActionBlockFragment,
    EventsListBlockFragment,
    GroupingBlockFragment,
    ImageGridBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    PageListBlockFragment,
    ReachOutBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
  ],
);
