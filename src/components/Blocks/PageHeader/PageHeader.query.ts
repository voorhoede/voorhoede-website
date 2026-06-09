import { graphql } from "~/utils/graphql";

export const PageHeaderFragment = graphql(`
  fragment PageHeaderFragment on SectionHeaderRecord {
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
