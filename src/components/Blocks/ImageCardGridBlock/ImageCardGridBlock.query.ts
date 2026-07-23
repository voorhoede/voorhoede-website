import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to GalleryBlockRecord. */
export const ImageCardGridBlockFragment = graphql(`
  fragment ImageCardGridBlockFragment on GalleryBlockRecord {
    id
    title
  }
`);
