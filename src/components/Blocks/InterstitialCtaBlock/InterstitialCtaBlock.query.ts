import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to ActionBlockRecord. */
export const InterstitialCtaBlockFragment = graphql(`
  fragment InterstitialCtaBlockFragment on ActionBlockRecord {
    id
  }
`);
