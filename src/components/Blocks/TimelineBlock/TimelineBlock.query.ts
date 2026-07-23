import { graphql } from "~/utils/graphql";

/** Legacy block — retained for unused components; maps to ListBlockRecord. */
export const TimelineBlockFragment = graphql(`
  fragment TimelineBlockFragment on ListBlockRecord {
    id
    listType
  }
`);
