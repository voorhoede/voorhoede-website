import { graphql } from "~/utils/graphql";
import { CaseListFragment } from "../CaseList/CaseList.query";
import { DialogueCtaFragment } from "../DialogueCta/DialogueCta.query";
import { GroupingFragment } from "../Grouping/Grouping.query";
import { ImageCardGridFragment } from "../ImageCardGrid/ImageCardGrid.query";
import { LogoGridFragment } from "../LogoGrid/LogoGrid.query";
import { PageHeaderFragment } from "../PageHeader/PageHeader.query";
import { TextImageFragment } from "../TextImage/TextImage.query";

export const PagePartialFragment = graphql(
  `fragment PagePartialFragment on PagePartialBlockRecord {
      __typename
      id
      item {
        id
        title
        section {
          __typename
          ...CaseListFragment
          ...DialogueCtaFragment
          ...GroupingFragment
          ...ImageCardGridFragment
          ...LogoGridFragment
          ...PageHeaderFragment
          ...TextImageFragment
        }
      }
    }`,
  [
    CaseListFragment,
    DialogueCtaFragment,
    GroupingFragment,
    ImageCardGridFragment,
    LogoGridFragment,
    PageHeaderFragment,
    TextImageFragment,
  ],
);
