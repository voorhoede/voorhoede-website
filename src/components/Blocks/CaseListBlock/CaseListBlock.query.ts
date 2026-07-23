import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

export const CaseListBlockFragment = graphql(
  `
    fragment CaseListBlockFragment on CaseListBlockRecord {
      id
      title
      columns
      cases {
        title
        slug
        subtitle
        heroIllustration {
          url
          alt
          width
          height
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
