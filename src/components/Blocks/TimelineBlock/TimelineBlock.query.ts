import { graphql } from "~/utils/graphql";

export const TimelineBlockFragment = graphql(`
  fragment TimelineBlockFragment on SectionTimelineRecord {
    items {
      id
      date
      description
      image {
        url
        alt
        width
        height
      }
      title
    }
  }
`);
