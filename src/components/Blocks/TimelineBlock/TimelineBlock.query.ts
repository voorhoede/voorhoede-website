import { graphql } from "~/utils/graphql";

export const TimelineBlockFragment = graphql(`
  fragment TimelineBlockFragment on SectionTimelineRecord {
    id
    backgroundColor
    items {
      id
      date
      title
      description
      image {
        url
        alt
        width
        height
      }
    }
  }
`);
