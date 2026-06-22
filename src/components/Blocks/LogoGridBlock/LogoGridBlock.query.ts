import { graphql } from "~/utils/graphql";

export const LogoGridBlockFragment = graphql(`
  fragment LogoGridBlockFragment on SectionLogoGridRecord {
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
