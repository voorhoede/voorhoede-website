import { graphql } from "~/utils/graphql";
import { CaseListFragment } from "../CaseList/CaseList.query";
import { DialogueCtaFragment } from "../DialogueCta/DialogueCta.query";
import { LogoGridFragment } from "../LogoGrid/LogoGrid.query";

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
          ...LogoGridFragment
        }
      }
    }`,
  [CaseListFragment, DialogueCtaFragment, LogoGridFragment],
);
