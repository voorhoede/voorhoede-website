import { graphql } from "~/utils/graphql";

export const GalleryBlockFragment = graphql(`
  fragment GalleryBlockFragment on GalleryBlockRecord {
    id
    title
    gallery
    images {
      id
      url
      alt
      width
      height
    }
  }
`);
