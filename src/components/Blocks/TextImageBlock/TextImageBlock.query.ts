import { graphql } from "~/utils/graphql";

export const TextImageBlockFragment = graphql(`
  fragment TextImageBlockFragment on SectionTextImageRecord {
    text {
      value
    }
    image {
      url
      alt
      width
      height
    }
    layout
  }
`);
