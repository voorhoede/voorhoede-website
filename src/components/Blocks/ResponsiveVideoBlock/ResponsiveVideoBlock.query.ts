import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to VideoEmbedBlockRecord. */
export const ResponsiveVideoBlockFragment = graphql(`
  fragment ResponsiveVideoBlockFragment on VideoEmbedBlockRecord {
    id
    caption
  }
`);
