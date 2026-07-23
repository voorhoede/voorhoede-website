import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to PageListRecord. */
export const JobsListBlockFragment = graphql(`
  fragment JobsListBlockFragment on PageListRecord {
    id
    title
  }
`);
