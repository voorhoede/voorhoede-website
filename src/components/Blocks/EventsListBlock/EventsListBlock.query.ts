import { graphql } from "~/utils/graphql";

export const EventsListBlockFragment = graphql(`
  fragment EventsListBlockFragment on EventsListRecord {
    id
    title
    items {
      title
      slug
      date
      image {
        url
        alt
        width
        height
      }
      seo {
        description
      }
      tags {
        title
        category
      }
    }
  }
`);
