import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to PageListBlockRecord. */
export const JobsListBlockFragment = graphql(`
  fragment JobsListBlockFragment on PageListBlockRecord {
    id
    title
  }
`);
