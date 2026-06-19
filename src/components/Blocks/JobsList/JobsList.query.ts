import { graphql } from "~/utils/graphql";

export const JobsListFragment = graphql(`
  fragment JobsListFragment on SectionJobsListRecord {
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
