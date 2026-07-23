import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to ActionBlockRecord. */
export const DialogueCtaBlockFragment = graphql(`
  fragment DialogueCtaBlockFragment on ActionBlockRecord {
    id
  }
`);
