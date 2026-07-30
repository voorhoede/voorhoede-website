import { graphql } from "~/utils/graphql";
import { ActionBlockFragment } from "../ActionBlock/ActionBlock.query";
import { GlossaryTermLinkFragment } from "../shared/structuredText.query";

export const ImageGridItemFragment = graphql(
  `
    fragment ImageGridItemFragment on ImageGridItemRecord {
      id
      title
      image {
        url
        alt
        width
        height
      }
      body {
        value
        links {
          __typename
          ... on HomePageRecord {
            id
            title
          }
          ... on PageRecord {
            id
            slug
            title
          }
          ...GlossaryTermLinkFragment
        }
      }
      cta {
        ...ActionBlockRecordFragment
      }
      isFullWidth
    }
  `,
  [GlossaryTermLinkFragment, ActionBlockFragment],
);

export const ImageGridBlockFragment = graphql(
  `
    fragment ImageGridBlockFragment on ImageGridBlockRecord {
      id
      title
      layout
      cardOrientation
      items {
        ...ImageGridItemFragment
      }
    }
  `,
  [ImageGridItemFragment],
);
