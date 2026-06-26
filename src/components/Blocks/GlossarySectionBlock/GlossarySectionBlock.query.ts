import { graphql } from "~/utils/graphql";

export const GlossarySectionBlockFragment = graphql(`
  fragment GlossarySectionBlockFragment on SectionGlossaryRecord {
    title
  }
`);
