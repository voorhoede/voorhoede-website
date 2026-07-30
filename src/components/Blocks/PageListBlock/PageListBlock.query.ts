import { graphql } from "~/utils/graphql";
import {
  ActionBlockFragment,
  GlossaryTermLinkFragment,
  IconBlockFragment,
  ImageBlockFragment,
  VariableBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "~/components/Blocks/shared/structuredText.query";

export const PageListBlockFragment = graphql(
  `
    fragment PageListBlockFragment on PageListBlockRecord {
      id
      title
      columns
      body {
        value
        links {
          __typename
          ... on HomePageRecord {
            id
            title
          }
          ... on PageRecord {
            id
            slug
            title
          }
          ... on FileRecord {
            id
            title
            file {
              url
            }
          }
          ...GlossaryTermLinkFragment
        }
        blocks {
          __typename
          ...ActionBlockFragment
          ...ImageBlockFragment
          ...VideoBlockFragment
          ...VideoEmbedBlockFragment
        }
        inlineBlocks {
          __typename
          ...IconBlockFragment
          ...VariableBlockFragment
        }
      }
      pinned {
        id
        title
        slug
        subtitle
        previewImage {
          url
          alt
          width
          height
        }
      }
      tagFilter {
        id
        title
        _allReferencingPages(
          first: 12
          through: { fields: { anyIn: [page_tags] } }
        ) {
          id
          title
          slug
          subtitle
          previewImage {
            url
            alt
            width
            height
          }
        }
        _allReferencingPagesMeta(
          through: { fields: { anyIn: [page_tags] } }
        ) {
          count
        }
      }
    }
  `,
  [
    ActionBlockFragment,
    GlossaryTermLinkFragment,
    IconBlockFragment,
    ImageBlockFragment,
    VariableBlockFragment,
    VideoBlockFragment,
    VideoEmbedBlockFragment,
  ],
);

export const PageListBlockPagesQuery = graphql(`
  query PageListBlockPages(
    $tagId: ItemId!
    $locale: SiteLocale
    $first: IntType!
    $skip: IntType!
    $excludeIds: [ItemId]
  ) {
    tag(filter: { id: { eq: $tagId } }, locale: $locale) {
      _allReferencingPages(
        first: $first
        skip: $skip
        locale: $locale
        through: { fields: { anyIn: [page_tags] } }
        filter: { id: { notIn: $excludeIds } }
      ) {
        id
        title
        slug
        subtitle
        previewImage {
          url
          alt
          width
          height
        }
      }
      _allReferencingPagesMeta(
        locale: $locale
        through: { fields: { anyIn: [page_tags] } }
        filter: { id: { notIn: $excludeIds } }
      ) {
        count
      }
    }
  }
`);
