import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to ReachOutBlockRecord. */
export const NewsletterBlockFragment = graphql(`
  fragment NewsletterBlockFragment on ReachOutBlockRecord {
    id
    title
  }
`);
