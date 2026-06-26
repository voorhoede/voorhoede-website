import { graphql } from "~/utils/graphql";
import { LinkFragment } from "~/components/Core/AppLink/AppLink.query";

export const InterstitialCtaBlockFragment = graphql(
  `
    fragment InterstitialCtaBlockFragment on SectionInterstitialCtaRecord {
      title
      backgroundColor
      ctas {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment],
);
