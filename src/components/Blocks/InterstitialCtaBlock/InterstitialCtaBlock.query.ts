import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

export const InterstitialCtaBlockFragment = graphql(
  `
    fragment InterstitialCtaBlockFragment on SectionInterstitialCtaRecord {
      title
      backgroundColor
      ctas {
        ...LinkToRecordFragment
      }
    }
  `,
  [LinkToRecordFragment],
);
