import { graphql } from "~/utils/graphql";

export const CtaBlockFragment = graphql(`
  fragment CtaBlockFragment on CallToActionRecord {
    id
    title
    body
    linkLabel
    linkUrl
    linkIsExternal
    secondaryLinkLabel
    secondaryLinkUrl
    secondaryLinkIsExternal
    person {
      image {
        url
        alt
        width
        height
      }
      name
    }
  }
`);
