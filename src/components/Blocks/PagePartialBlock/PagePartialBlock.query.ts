import { graphql } from "~/utils/graphql";
import { ActionBlockFragment } from "../ActionBlock/ActionBlock.query";
import { BlogListBlockFragment } from "../BlogListBlock/BlogListBlock.query";
import { EventsListBlockFragment } from "../EventsListBlock/EventsListBlock.query";
import { GalleryBlockFragment } from "../GalleryBlock/GalleryBlock.query";
import { GlossaryListBlockFragment } from "../GlossaryListBlock/GlossaryListBlock.query";
import {
  CodeBlockFragment,
  EmbedBlockFragment,
  GroupingBlockFragment,
  TestimonialBlockFragment,
} from "../GroupingBlock/GroupingBlock.query";
import { ImageGridBlockFragment } from "../ImageGridBlock/ImageGridBlock.query";
import { LogoGridBlockFragment } from "../LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "../PageHeaderBlock/PageHeaderBlock.query";
import { PageListBlockFragment } from "../PageListBlock/PageListBlock.query";
import { ReachOutBlockFragment } from "../ReachOutBlock/ReachOutBlock.query";
import {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "../shared/structuredText.query";
import { TeamGalleryBlockFragment } from "../TeamGalleryBlock/TeamGalleryBlock.query";
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
          ...BlogListBlockFragment
          ...CodeBlockFragment
          ...EmbedBlockFragment
          ...EventsListBlockFragment
          ...GalleryBlockFragment
          ...GlossaryListBlockFragment
          ...GroupingBlockFragment
          ...ImageBlockFragment
          ...ImageGridBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...PageListBlockFragment
          ...ReachOutBlockFragment
          ...TeamGalleryBlockFragment
          ...TestimonialBlockFragment
          ...TextBlockFragment
          ...TextImageBlockFragment
          ...VideoBlockFragment
          ...VideoEmbedBlockFragment
        }
      }
    }
  `,
  [
    ActionBlockFragment,
    BlogListBlockFragment,
    CodeBlockFragment,
    EmbedBlockFragment,
    EventsListBlockFragment,
    GalleryBlockFragment,
    GlossaryListBlockFragment,
    GroupingBlockFragment,
    ImageBlockFragment,
    ImageGridBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    PageListBlockFragment,
    ReachOutBlockFragment,
    TeamGalleryBlockFragment,
    TestimonialBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
    VideoBlockFragment,
    VideoEmbedBlockFragment,
  ],
);
