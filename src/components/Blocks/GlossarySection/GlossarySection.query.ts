import { graphql } from "~/utils/graphql";

export const GlossarySectionFragment = graphql(`
  fragment GlossarySectionFragment on SectionGlossaryRecord {
    id
    title
  }
`);
