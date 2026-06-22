import { graphql } from "~/utils/graphql";

export const PageHeaderBlockFragment = graphql(`
  fragment PageHeaderBlockFragment on SectionHeaderRecord {
    layout
    style
    title
    subtitle
    illustration {
      url
      alt
      width
      height
    }
  }
`);
