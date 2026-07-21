import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

export const CaseListBlockFragment = graphql(
  `
    fragment CaseListBlockFragment on SectionCaseListRecord {
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
          ...LinkToRecordFragment
        }
      }
    }
  `,
  [LinkToRecordFragment],
);
