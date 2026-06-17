import { graphql } from "~/utils/graphql";

export const ImageGridFragment = graphql(`
  fragment ImageGridFragment on SectionImageGridRecord {
    id
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
