import { graphql } from "~/utils/graphql";

export const EventsSectionFragment = graphql(`
  fragment EventsSectionFragment on SectionEventsSectionRecord {
    id
    title
    backgroundColor
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
