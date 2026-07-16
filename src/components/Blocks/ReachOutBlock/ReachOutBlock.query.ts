import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

export const ReachOutBlockFragment = graphql(
  `
    fragment ReachOutBlockFragment on ReachOutBlockRecord {
      title
      body(markdown: true)
      formType
      cta {
        ...LinkToRecordFragment
      }
      contactPerson {
        name
        lastName
        jobTitle
        image {
          url
          alt
          width
          height
        }
      }
    }
  `,
  [LinkToRecordFragment],
);
