import { graphql } from "~/utils/graphql";

export const BlogsSectionBlockFragment = graphql(`
  fragment BlogsSectionBlockFragment on SectionBlogsSectionRecord {
    backgroundColor
    title
    itemSize
    items {
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
    pinnedItems {
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
`);
