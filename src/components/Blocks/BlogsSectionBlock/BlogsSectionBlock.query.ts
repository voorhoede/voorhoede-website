import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to BlogListBlockRecord. */
export const BlogsSectionBlockFragment = graphql(`
  fragment BlogsSectionBlockFragment on BlogListBlockRecord {
    id
    title
  }
`);
