import { graphql } from "~/utils/graphql";

export const JobsListBlockFragment = graphql(`
  fragment JobsListBlockFragment on SectionJobsListRecord {
    id
    jobs {
      title
      slug
      isClosed
      jobImage {
        url
        alt
        width
        height
      }
    }
  }
`);
