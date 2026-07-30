import { graphql } from "~/utils/graphql";
import { ActionBlockFragment } from "~/components/Blocks/ActionBlock/ActionBlock.query";
import { BlogListBlockFragment } from "~/components/Blocks/BlogListBlock/BlogListBlock.query";
import { EventsListBlockFragment } from "~/components/Blocks/EventsListBlock/EventsListBlock.query";
import { GalleryBlockFragment } from "~/components/Blocks/GalleryBlock/GalleryBlock.query";
import { GlossaryListBlockFragment } from "~/components/Blocks/GlossaryListBlock/GlossaryListBlock.query";
import {
  CodeBlockFragment,
  EmbedBlockFragment,
  GroupingBlockFragment,
  TestimonialBlockFragment,
} from "~/components/Blocks/GroupingBlock/GroupingBlock.query";
import { ImageGridBlockFragment } from "~/components/Blocks/ImageGridBlock/ImageGridBlock.query";
import { LogoGridBlockFragment } from "~/components/Blocks/LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query";
import { PageListBlockFragment } from "~/components/Blocks/PageListBlock/PageListBlock.query";
import { PagePartialBlockFragment } from "~/components/Blocks/PagePartialBlock/PagePartialBlock.query";
import { ReachOutBlockFragment } from "~/components/Blocks/ReachOutBlock/ReachOutBlock.query";
import { TeamGalleryBlockFragment } from "~/components/Blocks/TeamGalleryBlock/TeamGalleryBlock.query";
import { TextBlockFragment } from "~/components/Blocks/TextBlock/TextBlock.query";
import { TextImageBlockFragment } from "~/components/Blocks/TextImageBlock/TextImageBlock.query";
import {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "~/components/Blocks/shared/structuredText.query";

export const blogSlugQuery = graphql(
  `
    query BlogSlug($locale: SiteLocale, $slug: String) {
      page: blogPost(locale: $locale, filter: { slug: { eq: $slug } }) {
        id
        slug
        i18nSlugs: _allSlugLocales {
          locale
          value
        }
        title
        subtitle
        isArchived
        headerIllustration {
          url
          alt
          width
          height
        }
        date: _firstPublishedAt
        authors {
          name
          lastName
          slug
          image {
            url
            alt
            width
            height
          }
        }
        introTitle
        seo {
          title
          description
          image {
            url
          }
        }
        bodyBlocks {
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
        reachOut {
          ...ReachOutBlockFragment
        }
        relatedBlogPosts {
          slug
          title
          date: _firstPublishedAt
          authors {
            name
            image {
              url
              alt
              width
              height
            }
          }
        }
        tags {
          id
          title
          slug
          blogPosts: _allReferencingBlogPosts(
            first: 3
            filter: { slug: { neq: $slug } }
          ) {
            slug
            title
            date: _firstPublishedAt
            authors {
              name
              image {
                url
                alt
                width
                height
              }
            }
          }
        }
        onMountedScript
        onUnmountedScript
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
