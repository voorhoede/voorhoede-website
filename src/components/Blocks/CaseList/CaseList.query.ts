import { graphql } from "~/utils/graphql";
import { LinkFragment } from "~/components/Core/AppLink/AppLink.query";

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
    text {
      value
      blocks {
        ...LinkFragment
      }
    }
  }`,
  [LinkFragment],
);
