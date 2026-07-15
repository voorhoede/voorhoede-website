import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

export const ReachOutBlockFragment = graphql(
  `
    fragment ReachOutBlockFragment on ReachOutBlockRecord {
      pivot {
        title
        body(markdown: true)
        links {
          ...LinkToRecordFragment
        }
        formType
        mailchimpValue
        mailchimpName
        mailchimpId
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
    }
  `,
  [LinkToRecordFragment],
);
