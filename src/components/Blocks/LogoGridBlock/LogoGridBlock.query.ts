import { graphql } from "~/utils/graphql";

export const LogoGridBlockFragment = graphql(`
  fragment LogoGridBlockFragment on LogoGridRecord {
    title
    logos {
      url
      alt
      width
      height
      customData
    }
  }
`);
