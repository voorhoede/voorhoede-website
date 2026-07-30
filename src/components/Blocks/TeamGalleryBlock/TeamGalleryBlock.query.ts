import { graphql } from "~/utils/graphql";

export const TeamGalleryBlockFragment = graphql(`
  fragment TeamGalleryBlockFragment on TeamGalleryRecord {
    persons {
      id
      jobTitle
      lastName
      name
      slug
      image {
        url
        alt
        width
        height
      }
    }
  }
`);
