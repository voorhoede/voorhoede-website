import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

export const ImageCardGridBlockFragment = graphql(
  `
    fragment ImageCardGridBlockFragment on SectionImageCardGridRecord {
      title
      backgroundColor
      cardOrientation
      text {
        value
        blocks {
          ...LinkToRecordFragment
        }
      }
      items {
        id
        title
        body {
          value
        }
        image {
          url
          alt
          width
          height
        }
        links {
          ...LinkToRecordFragment
        }
      }
    }
  `,
  [LinkToRecordFragment],
);
