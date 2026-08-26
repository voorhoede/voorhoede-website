import { graphql } from "~/utils/graphql";
import { ActionBlockFragment } from "./ActionBlock/ActionBlock.query";
import { BlogListBlockFragment } from "./BlogListBlock/BlogListBlock.query";
import { EventsListBlockFragment } from "./EventsListBlock/EventsListBlock.query";
import { GalleryBlockFragment } from "./GalleryBlock/GalleryBlock.query";
import { GlossaryListBlockFragment } from "./GlossaryListBlock/GlossaryListBlock.query";
import {
  CodeBlockFragment,
  EmbedBlockFragment,
  GroupingBlockFragment,
  TestimonialBlockFragment,
} from "./GroupingBlock/GroupingBlock.query";
import { ImageGridBlockFragment } from "./ImageGridBlock/ImageGridBlock.query";
import { LogoGridBlockFragment } from "./LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "./PageHeaderBlock/PageHeaderBlock.query";
import { PageListBlockFragment } from "./PageListBlock/PageListBlock.query";
import { PagePartialBlockFragment } from "./PagePartialBlock/PagePartialBlock.query";
import { ReachOutBlockFragment } from "./ReachOutBlock/ReachOutBlock.query";
import { TeamGalleryBlockFragment } from "./TeamGalleryBlock/TeamGalleryBlock.query";
import { TextBlockFragment } from "./TextBlock/TextBlock.query";
import { TextImageBlockFragment } from "./TextImageBlock/TextImageBlock.query";
import {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "./shared/structuredText.query";

// locations_list is only allowed on page.bodyBlocks and must stay out of this
// fragment: DatoCMS validates a query against a schema pruned to the unions it
// touches, so selecting LocationsListRecord fields fails any query whose
// bodyBlocks union cannot contain that block.
export const BodyBlocksFragment = graphql(
  `
    fragment BodyBlocksFragment on RecordInterface @_unmask {
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
      ...PagePartialBlockFragment
      ...ReachOutBlockFragment
      ...TeamGalleryBlockFragment
      ...TestimonialBlockFragment
      ...TextBlockFragment
      ...TextImageBlockFragment
      ...VideoBlockFragment
      ...VideoEmbedBlockFragment
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
    PagePartialBlockFragment,
    ReachOutBlockFragment,
    TeamGalleryBlockFragment,
    TestimonialBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
    VideoBlockFragment,
    VideoEmbedBlockFragment,
  ],
);
