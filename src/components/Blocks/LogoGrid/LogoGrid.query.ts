import { graphql } from "~/utils/graphql";

export const LogoGridFragment = graphql(`
  fragment LogoGridFragment on SectionLogoGridRecord {
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
