import { graphql } from "~/utils/graphql";
import { ActionBlockFragment } from "../ActionBlock/ActionBlock.query";
import { BlogsSectionBlockFragment } from "../BlogsSectionBlock/BlogsSectionBlock.query";
import { CaseListBlockFragment } from "../CaseListBlock/CaseListBlock.query";
import { EventsListBlockFragment } from "../EventsListBlock/EventsListBlock.query";
import { ImageGridBlockFragment } from "../ImageGridBlock/ImageGridBlock.query";
import { LogoGridBlockFragment } from "../LogoGridBlock/LogoGridBlock.query";
import { ReachOutBlockFragment } from "../ReachOutBlock/ReachOutBlock.query";
import {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "../shared/structuredText.query";
import { TeamGalleryBlockFragment } from "../TeamGalleryBlock/TeamGalleryBlock.query";
import { TextBlockFragment } from "../TextBlock/TextBlock.query";
import { TextImageBlockFragment } from "../TextImageBlock/TextImageBlock.query";

export const CodeBlockFragment = graphql(`
  fragment CodeBlockFragment on CodeBlockRecord {
    id
    language
    body
  }
`);

export const EmbedBlockFragment = graphql(`
  fragment EmbedBlockFragment on EmbedBlockRecord {
    id
    title
    url
    caption
    previewType
  }
`);

export const TestimonialBlockFragment = graphql(`
  fragment TestimonialBlockFragment on TestimonialBlockRecord {
    id
    author
    company
    quote
    validated
    fullwidth
  }
`);

export const GroupingItemFragment = graphql(
  `
    fragment GroupingItemFragment on GroupingItemRecord {
      id
      title
      sections {
        __typename
        ...ActionBlockRecordFragment
        ...BlogsSectionBlockFragment
        ...CaseListBlockFragment
        ...CodeBlockFragment
        ...EmbedBlockFragment
        ...EventsListBlockFragment
        ...ImageBlockFragment
        ...ImageGridBlockFragment
        ...LogoGridBlockFragment
        ...ReachOutBlockFragment
        ...TeamGalleryBlockFragment
        ...TestimonialBlockFragment
        ...TextBlockFragment
        ...TextImageBlockFragment
        ...VideoBlockFragment
        ...VideoEmbedBlockFragment
      }
    }
  `,
  [
    ActionBlockFragment,
    BlogsSectionBlockFragment,
    CaseListBlockFragment,
    CodeBlockFragment,
    EmbedBlockFragment,
    EventsListBlockFragment,
    ImageBlockFragment,
    ImageGridBlockFragment,
    LogoGridBlockFragment,
    ReachOutBlockFragment,
    TeamGalleryBlockFragment,
    TestimonialBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
    VideoBlockFragment,
    VideoEmbedBlockFragment,
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
