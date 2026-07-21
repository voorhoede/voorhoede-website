import { graphql } from "~/utils/graphql";

export const CallToActionBlockFragment = graphql(`
  fragment CallToActionBlockFragment on CallToActionRecord {
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
      name
      image {
        url
        alt
        width
        height
      }
    }
  }
`);
