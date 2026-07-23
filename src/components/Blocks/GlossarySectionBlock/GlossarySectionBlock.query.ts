import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to GlossaryListRecord. */
export const GlossarySectionBlockFragment = graphql(`
  fragment GlossarySectionBlockFragment on GlossaryListRecord {
    id
    title
  }
`);
