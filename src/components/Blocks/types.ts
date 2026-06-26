import type { CaseListBlockFragment } from "./CaseListBlock/CaseListBlock.query";
import type { DialogueCtaBlockFragment } from "./DialogueCtaBlock/DialogueCtaBlock.query";
import type { GroupingBlockFragment } from "./GroupingBlock/GroupingBlock.query";
import type { ImageCardGridBlockFragment } from "./ImageCardGridBlock/ImageCardGridBlock.query";
import type { LogoGridBlockFragment } from "./LogoGridBlock/LogoGridBlock.query";
import type { PageHeaderBlockFragment } from "./PageHeaderBlock/PageHeaderBlock.query";
import type { PagePartialBlockFragment } from "./PagePartialBlock/PagePartialBlock.query";
import type { TextBlockFragment } from "./TextBlock/TextBlock.query";
import type { TextImageBlockFragment } from "./TextImageBlock/TextImageBlock.query";

export type BlockRecord =
  | (FragmentOf<typeof CaseListBlockFragment> & {
      __typename: "SectionCaseListRecord";
    })
  | (FragmentOf<typeof DialogueCtaBlockFragment> & {
      __typename: "SectionDialogueCtaRecord";
    })
  | (FragmentOf<typeof GroupingBlockFragment> & {
      __typename: "SectionGroupingRecord";
    })
  | (FragmentOf<typeof ImageCardGridBlockFragment> & {
      __typename: "SectionImageCardGridRecord";
    })
  | (FragmentOf<typeof LogoGridBlockFragment> & {
      __typename: "SectionLogoGridRecord";
    })
  | (FragmentOf<typeof PageHeaderBlockFragment> & {
      __typename: "SectionHeaderRecord";
    })
  | (FragmentOf<typeof PagePartialBlockFragment> & {
      __typename: "PagePartialBlockRecord";
    })
  | (FragmentOf<typeof TextBlockFragment> & {
      __typename: "TextBlockRecord";
    })
  | (FragmentOf<typeof TextImageBlockFragment> & {
      __typename: "SectionTextImageRecord";
    });
