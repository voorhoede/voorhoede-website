import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to EventsListRecord. */
export const EventsSectionBlockFragment = graphql(`
  fragment EventsSectionBlockFragment on EventsListRecord {
    id
    title
  }
`);
