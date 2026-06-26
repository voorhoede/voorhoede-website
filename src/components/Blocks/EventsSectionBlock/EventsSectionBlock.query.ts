import { graphql } from "~/utils/graphql";

export const EventsSectionBlockFragment = graphql(`
  fragment EventsSectionBlockFragment on SectionEventsSectionRecord {
    backgroundColor
    title
    items {
      title
      slug
      date
      social {
        description
      }
    }
  }
`);
