import type { BlogsSectionBlockFragment } from "./BlogsSectionBlock/BlogsSectionBlock.query";
import type { CallToActionBlockFragment } from "./CallToActionBlock/CallToActionBlock.query";
import type { CaseListBlockFragment } from "./CaseListBlock/CaseListBlock.query";
import type { DialogueCtaBlockFragment } from "./DialogueCtaBlock/DialogueCtaBlock.query";
import type { EventsSectionBlockFragment } from "./EventsSectionBlock/EventsSectionBlock.query";
import type { GlossarySectionBlockFragment } from "./GlossarySectionBlock/GlossarySectionBlock.query";
import type { GroupingBlockFragment } from "./GroupingBlock/GroupingBlock.query";
import type { ImageCardGridBlockFragment } from "./ImageCardGridBlock/ImageCardGridBlock.query";
import type { ImageGridBlockFragment } from "./ImageGridBlock/ImageGridBlock.query";
import type { InterstitialCtaBlockFragment } from "./InterstitialCtaBlock/InterstitialCtaBlock.query";
import type { JobsListBlockFragment } from "./JobsListBlock/JobsListBlock.query";
import type { LogoGridBlockFragment } from "./LogoGridBlock/LogoGridBlock.query";
import type { NewsletterBlockFragment } from "./NewsletterBlock/NewsletterBlock.query";
import type { PageHeaderBlockFragment } from "./PageHeaderBlock/PageHeaderBlock.query";
import type { PagePartialBlockFragment } from "./PagePartialBlock/PagePartialBlock.query";
import type { ReachOutBlockFragment } from "./ReachOutBlock/ReachOutBlock.query";
import type { ResponsiveVideoBlockFragment } from "./ResponsiveVideoBlock/ResponsiveVideoBlock.query";
import type { SectionImageTextRecordFragment } from "./SectionImageTextRecord/SectionImageTextRecord.query";
import type { TeamGalleryBlockFragment } from "./TeamGalleryBlock/TeamGalleryBlock.query";
import type { TextBlockFragment } from "./TextBlock/TextBlock.query";
import type { TextImageBlockFragment } from "./TextImageBlock/TextImageBlock.query";
import type { TimelineBlockFragment } from "./TimelineBlock/TimelineBlock.query";

export type BlockRecord =
  | (FragmentOf<typeof BlogsSectionBlockFragment> & {
      __typename: "SectionBlogsSectionRecord";
    })
  | (FragmentOf<typeof CallToActionBlockFragment> & {
      __typename: "CallToActionRecord";
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
  | (FragmentOf<typeof GlossarySectionBlockFragment> & {
      __typename: "SectionGlossaryRecord";
    })
  | (FragmentOf<typeof GroupingBlockFragment> & {
      __typename: "SectionGroupingRecord";
    })
  | (FragmentOf<typeof ImageCardGridBlockFragment> & {
      __typename: "SectionImageCardGridRecord";
    })
  | (FragmentOf<typeof ImageGridBlockFragment> & {
      __typename: "SectionImageGridRecord";
    })
  | (FragmentOf<typeof InterstitialCtaBlockFragment> & {
      __typename: "SectionInterstitialCtaRecord";
    })
  | (FragmentOf<typeof JobsListBlockFragment> & {
      __typename: "SectionJobsListRecord";
    })
  | (FragmentOf<typeof LogoGridBlockFragment> & {
      __typename: "SectionLogoGridRecord";
    })
  | (FragmentOf<typeof NewsletterBlockFragment> & {
      __typename: "SectionNewsletterRecord";
    })
  | (FragmentOf<typeof PageHeaderBlockFragment> & {
      __typename: "SectionHeaderRecord";
    })
  | (FragmentOf<typeof PagePartialBlockFragment> & {
      __typename: "PagePartialBlockRecord";
    })
  | (FragmentOf<typeof ReachOutBlockFragment> & {
      __typename: "ReachOutBlockRecord";
    })
  | (FragmentOf<typeof ResponsiveVideoBlockFragment> & {
      __typename: "SectionVideoRecord";
    })
  | (FragmentOf<typeof SectionImageTextRecordFragment> & {
      __typename: "SectionImageTextRecord";
    })
  | (FragmentOf<typeof TeamGalleryBlockFragment> & {
      __typename: "SectionTeamGalleryRecord";
    })
  | (FragmentOf<typeof TextBlockFragment> & {
      __typename: "TextBlockRecord";
    })
  | (FragmentOf<typeof TextImageBlockFragment> & {
      __typename: "SectionTextImageRecord";
    })
  | (FragmentOf<typeof TimelineBlockFragment> & {
      __typename: "SectionTimelineRecord";
    });
