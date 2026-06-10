import type { CaseListFragment } from "./CaseList/CaseList.query";
import type { DialogueCtaFragment } from "./DialogueCta/DialogueCta.query";
import type { ImageCardGridFragment } from "./ImageCardGrid/ImageCardGrid.query";
import type { LogoGridFragment } from "./LogoGrid/LogoGrid.query";
import type { PageHeaderFragment } from "./PageHeader/PageHeader.query";
import type { PagePartialFragment } from "./PagePartial/PagePartial.query";
import type { TextImageFragment } from "./TextImage/TextImage.query";

export type BlockRecord =
  | (FragmentOf<typeof CaseListFragment> & {
      __typename: "SectionCaseListRecord";
    })
  | (FragmentOf<typeof DialogueCtaFragment> & {
      __typename: "SectionDialogueCtaRecord";
    })
  | (FragmentOf<typeof ImageCardGridFragment> & {
      __typename: "SectionImageCardGridRecord";
    })
  | (FragmentOf<typeof LogoGridFragment> & {
      __typename: "SectionLogoGridRecord";
    })
  | (FragmentOf<typeof PageHeaderFragment> & {
      __typename: "SectionHeaderRecord";
    })
  | (FragmentOf<typeof PagePartialFragment> & {
      __typename: "PagePartialBlockRecord";
    })
  | (FragmentOf<typeof TextImageFragment> & {
      __typename: "SectionTextImageRecord";
    });
