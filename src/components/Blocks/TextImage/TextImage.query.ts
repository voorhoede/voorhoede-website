import { graphql } from "~/utils/graphql";

export const TextImageFragment = graphql(`
  fragment TextImageFragment on SectionTextImageRecord {
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
