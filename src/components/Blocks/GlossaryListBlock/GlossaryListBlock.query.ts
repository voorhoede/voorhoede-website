import { graphql } from "~/utils/graphql";

export const GlossaryListBlockFragment = graphql(`
  fragment GlossaryListBlockFragment on GlossaryListRecord {
    id
    title
  }
`);
