import { graphql } from "~/utils/graphql";

export const ImageGridBlockFragment = graphql(`
  fragment ImageGridBlockFragment on SectionImageGridRecord {
    title
    backgroundColor
    items {
      title
      description
      image {
        url
        alt
        width
        height
      }
      isHighlighted
      isFullWidth
    }
  }
`);
