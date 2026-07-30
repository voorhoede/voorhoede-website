import type {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "./shared/structuredText.query";
import type { ActionBlockFragment } from "./ActionBlock/ActionBlock.query";
import type { BlogsSectionBlockFragment } from "./BlogsSectionBlock/BlogsSectionBlock.query";
import type { EventsListBlockFragment } from "./EventsListBlock/EventsListBlock.query";
import type {
  CodeBlockFragment,
  EmbedBlockFragment,
  GroupingBlockFragment,
  TestimonialBlockFragment,
} from "./GroupingBlock/GroupingBlock.query";
import type { ImageGridBlockFragment } from "./ImageGridBlock/ImageGridBlock.query";
import type { LocationsListBlockFragment } from "./LocationsListBlock/LocationsListBlock.query";
import type { LogoGridBlockFragment } from "./LogoGridBlock/LogoGridBlock.query";
import type { PageHeaderBlockFragment } from "./PageHeaderBlock/PageHeaderBlock.query";
import type { PageListBlockFragment } from "./PageListBlock/PageListBlock.query";
import type { PagePartialBlockFragment } from "./PagePartialBlock/PagePartialBlock.query";
import type { ReachOutBlockFragment } from "./ReachOutBlock/ReachOutBlock.query";
import type { TeamGalleryBlockFragment } from "./TeamGalleryBlock/TeamGalleryBlock.query";
import type { TextBlockFragment } from "./TextBlock/TextBlock.query";
import type { TextImageBlockFragment } from "./TextImageBlock/TextImageBlock.query";
import type { FragmentOf } from "~/utils/graphql";

export type BlockRecord =
  | (FragmentOf<typeof ActionBlockFragment> & {
      __typename: "ActionBlockRecord";
    })
  | (FragmentOf<typeof BlogsSectionBlockFragment> & {
      __typename: "BlogListBlockRecord";
    })
  | (FragmentOf<typeof CodeBlockFragment> & {
      __typename: "CodeBlockRecord";
    })
  | (FragmentOf<typeof EmbedBlockFragment> & {
      __typename: "EmbedBlockRecord";
    })
  | (FragmentOf<typeof EventsListBlockFragment> & {
      __typename: "EventsListRecord";
    })
  | (FragmentOf<typeof ImageBlockFragment> & {
      __typename: "ImageBlockRecord";
    })
  | (FragmentOf<typeof ImageGridBlockFragment> & {
      __typename: "ImageGridBlockRecord";
    })
  | (FragmentOf<typeof GroupingBlockFragment> & {
      __typename: "GroupingBlockRecord";
    })
  | (FragmentOf<typeof LocationsListBlockFragment> & {
      __typename: "LocationsListRecord";
    })
  | (FragmentOf<typeof LogoGridBlockFragment> & {
      __typename: "LogoGridRecord";
    })
  | (FragmentOf<typeof PageHeaderBlockFragment> & {
      __typename: "PageHeaderRecord";
    })
  | (FragmentOf<typeof PageListBlockFragment> & {
      __typename: "PageListBlockRecord";
    })
  | (FragmentOf<typeof PagePartialBlockFragment> & {
      __typename: "PagePartialBlockRecord";
    })
  | (FragmentOf<typeof ReachOutBlockFragment> & {
      __typename: "ReachOutBlockRecord";
    })
  | (FragmentOf<typeof TeamGalleryBlockFragment> & {
      __typename: "TeamGalleryRecord";
    })
  | (FragmentOf<typeof TestimonialBlockFragment> & {
      __typename: "TestimonialBlockRecord";
    })
  | (FragmentOf<typeof TextBlockFragment> & {
      __typename: "TextBlockRecord";
    })
  | (FragmentOf<typeof TextImageBlockFragment> & {
      __typename: "TextImageBlockRecord";
    })
  | (FragmentOf<typeof VideoBlockFragment> & {
      __typename: "VideoBlockRecord";
    })
  | (FragmentOf<typeof VideoEmbedBlockFragment> & {
      __typename: "VideoEmbedBlockRecord";
    });
