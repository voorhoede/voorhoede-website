import type { BlogsSectionBlockFragment } from "./BlogsSectionBlock/BlogsSectionBlock.query";
import type { CaseListBlockFragment } from "./CaseListBlock/CaseListBlock.query";
import type { DialogueCtaBlockFragment } from "./DialogueCtaBlock/DialogueCtaBlock.query";
import type { EventsSectionBlockFragment } from "./EventsSectionBlock/EventsSectionBlock.query";
import type { GroupingBlockFragment } from "./GroupingBlock/GroupingBlock.query";
import type { ImageCardGridBlockFragment } from "./ImageCardGridBlock/ImageCardGridBlock.query";
import type { JobsListBlockFragment } from "./JobsListBlock/JobsListBlock.query";
import type { LogoGridBlockFragment } from "./LogoGridBlock/LogoGridBlock.query";
import type { PageHeaderBlockFragment } from "./PageHeaderBlock/PageHeaderBlock.query";
import type { PagePartialBlockFragment } from "./PagePartialBlock/PagePartialBlock.query";
import type { TeamGalleryBlockFragment } from "./TeamGalleryBlock/TeamGalleryBlock.query";
import type { TextImageBlockFragment } from "./TextImageBlock/TextImageBlock.query";
import type { TimelineBlockFragment } from "./TimelineBlock/TimelineBlock.query";

export type BlockRecord =
  | (FragmentOf<typeof BlogsSectionBlockFragment> & {
      __typename: "SectionBlogsSectionRecord";
    })
  | (FragmentOf<typeof CaseListBlockFragment> & {
      __typename: "SectionCaseListRecord";
    })
  | (FragmentOf<typeof DialogueCtaBlockFragment> & {
      __typename: "SectionDialogueCtaRecord";
    })
  | (FragmentOf<typeof EventsSectionBlockFragment> & {
      __typename: "SectionEventsSectionRecord";
    })
  | (FragmentOf<typeof GroupingBlockFragment> & {
      __typename: "SectionGroupingRecord";
    })
  | (FragmentOf<typeof ImageCardGridBlockFragment> & {
      __typename: "SectionImageCardGridRecord";
    })
  | (FragmentOf<typeof JobsListBlockFragment> & {
      __typename: "SectionJobsListRecord";
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
  | (FragmentOf<typeof TeamGalleryBlockFragment> & {
      __typename: "SectionTeamGalleryRecord";
    })
  | (FragmentOf<typeof TextImageBlockFragment> & {
      __typename: "SectionTextImageRecord";
    })
  | (FragmentOf<typeof TimelineBlockFragment> & {
      __typename: "SectionTimelineRecord";
    });
