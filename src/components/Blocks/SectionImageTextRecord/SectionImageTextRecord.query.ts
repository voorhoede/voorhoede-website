import { graphql } from "~/utils/graphql";
import {
  ButtonsListFragment,
  GlossaryTermLinkFragment,
} from "~/components/Blocks/shared/structuredText.query";

export const SectionImageTextRecordFragment = graphql(
  `
    fragment SectionImageTextRecordFragment on SectionImageTextRecord {
      __typename
      title
      image {
        url
        alt
        width
        height
      }
      imagePosition
      backgroundColor
      fontSize
      body {
        value
        links {
          ...GlossaryTermLinkFragment
        }
        blocks {
          __typename
          ... on StructuredTextBlueTextRecord {
            id
            textAlignment
            body {
              value
              links {
                ...GlossaryTermLinkFragment
              }
              blocks {
                ... on StructuredTextButtonsListRecord {
                  __typename
                  ...ButtonsListFragment
                }
              }
            }
          }
          ...ButtonsListFragment
        }
      }
    }
  `,
  [GlossaryTermLinkFragment, ButtonsListFragment],
);
