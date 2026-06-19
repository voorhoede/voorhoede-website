import { graphql } from "~/utils/graphql";

export const BlogsSectionFragment = graphql(`
  fragment BlogsSectionFragment on SectionBlogsSectionRecord {
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
