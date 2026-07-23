import type { CaseListBlockFragment } from "./CaseListBlock/CaseListBlock.query";
import type { GroupingBlockFragment } from "./GroupingBlock/GroupingBlock.query";
import type { LogoGridBlockFragment } from "./LogoGridBlock/LogoGridBlock.query";
import type { PageHeaderBlockFragment } from "./PageHeaderBlock/PageHeaderBlock.query";
import type { PagePartialBlockFragment } from "./PagePartialBlock/PagePartialBlock.query";
import type { ReachOutBlockFragment } from "./ReachOutBlock/ReachOutBlock.query";
import type { TeamGalleryBlockFragment } from "./TeamGalleryBlock/TeamGalleryBlock.query";
import type { TextBlockFragment } from "./TextBlock/TextBlock.query";
import type { TextImageBlockFragment } from "./TextImageBlock/TextImageBlock.query";
import type { FragmentOf } from "~/utils/graphql";

export type BlockRecord =
  | (FragmentOf<typeof CaseListBlockFragment> & {
      __typename: "CaseListBlockRecord";
    })
  | (FragmentOf<typeof GroupingBlockFragment> & {
      __typename: "GroupingBlockRecord";
    })
  | (FragmentOf<typeof LogoGridBlockFragment> & {
      __typename: "LogoGridRecord";
    })
  | (FragmentOf<typeof PageHeaderBlockFragment> & {
      __typename: "PageHeaderRecord";
    })
  | (FragmentOf<typeof PagePartialBlockFragment> & {
      __typename: "PagePartialBlockRecord";
    })
  | (FragmentOf<typeof ReachOutBlockFragment> & {
      __typename: "ReachOutBlockRecord";
    })
  | (FragmentOf<typeof TeamGalleryBlockFragment> & {
      __typename: "TeamGalleryRecord";
    })
  | (FragmentOf<typeof TextBlockFragment> & {
      __typename: "TextBlockRecord";
    })
  | (FragmentOf<typeof TextImageBlockFragment> & {
      __typename: "TextImageBlockRecord";
    });
