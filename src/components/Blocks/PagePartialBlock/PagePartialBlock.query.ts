import { graphql } from "~/utils/graphql";
import { CaseListBlockFragment } from "../CaseListBlock/CaseListBlock.query";
import { DialogueCtaBlockFragment } from "../DialogueCtaBlock/DialogueCtaBlock.query";
import { GroupingBlockFragment } from "../GroupingBlock/GroupingBlock.query";
import { ImageCardGridBlockFragment } from "../ImageCardGridBlock/ImageCardGridBlock.query";
import { LogoGridBlockFragment } from "../LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "../PageHeaderBlock/PageHeaderBlock.query";
import { TextImageBlockFragment } from "../TextImageBlock/TextImageBlock.query";

export const PagePartialBlockFragment = graphql(
  `
    fragment PagePartialBlockFragment on PagePartialBlockRecord {
      __typename
      id
      item {
        id
        title
        section {
          __typename
          ...CaseListBlockFragment
          ...DialogueCtaBlockFragment
          ...GroupingBlockFragment
          ...ImageCardGridBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...TextImageBlockFragment
        }
      }
    }
  `,
  [
    CaseListBlockFragment,
    DialogueCtaBlockFragment,
    GroupingBlockFragment,
    ImageCardGridBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    TextImageBlockFragment,
  ],
);
