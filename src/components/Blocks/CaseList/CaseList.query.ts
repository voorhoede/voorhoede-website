import { graphql } from "~/utils/graphql";

export const CaseListFragment = graphql(`
  fragment CaseListFragment on SectionCaseListRecord {
    id
    title
    columns
    cases {
      title
      slug
      caseTeaser {
        title
        image {
          url
          alt
          width
          height
        }
      }
    }
  }
`);
