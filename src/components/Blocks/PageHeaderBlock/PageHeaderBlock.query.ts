import { graphql } from "~/utils/graphql";

export const PageHeaderBlockFragment = graphql(`
  fragment PageHeaderBlockFragment on PageHeaderRecord {
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
