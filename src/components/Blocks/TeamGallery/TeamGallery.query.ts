import { graphql } from "~/utils/graphql";

export const TeamGalleryFragment = graphql(`
  fragment TeamGalleryFragment on SectionTeamGalleryRecord {
    id
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
