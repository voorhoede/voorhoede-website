import { graphql } from "~/utils/graphql";

export const EventsSectionFragment = graphql(`
  fragment EventsSectionFragment on SectionEventsSectionRecord {
    title
    items {
      title
      social {
        description
      }
      date
      slug
    }
  }
`);
