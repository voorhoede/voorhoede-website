import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to GalleryBlockRecord. */
export const ImageGridBlockFragment = graphql(`
  fragment ImageGridBlockFragment on GalleryBlockRecord {
    id
    title
  }
`);
