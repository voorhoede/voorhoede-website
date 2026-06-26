import { graphql } from "~/utils/graphql";

export const TeamGalleryBlockFragment = graphql(`
  fragment TeamGalleryBlockFragment on SectionTeamGalleryRecord {
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
