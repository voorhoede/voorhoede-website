import { graphql } from "~/utils/graphql";
import {
  GlossaryTermLinkFragment,
  BlueTextFragment,
  ButtonsListFragment,
} from "../shared/structuredText.query";

export const ImageTextBlockFragment = graphql(
  `
    fragment ImageTextBlockFragment on SectionImageTextRecord {
      title
      imagePosition
      backgroundColor
      fontSize
      image {
        url
        alt
        width
        height
      }
      body {
        value
        links {
          ...GlossaryTermLinkFragment
        }
        blocks {
          __typename
          ...BlueTextFragment
          ...ButtonsListFragment
        }
      }
    }
  `,
  [GlossaryTermLinkFragment, BlueTextFragment, ButtonsListFragment],
);
