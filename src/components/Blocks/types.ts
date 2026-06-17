import type { BlogsSectionFragment } from "./BlogsSection/BlogsSection.query";
import type { CaseListFragment } from "./CaseList/CaseList.query";
import type { CtaBlockFragment } from "./CtaBlock/CtaBlock.query";
import type { DialogueCtaFragment } from "./DialogueCta/DialogueCta.query";
import type { EventsSectionFragment } from "./EventsSection/EventsSection.query";
import type { GlossarySectionFragment } from "./GlossarySection/GlossarySection.query";
import type { GroupingFragment } from "./Grouping/Grouping.query";
import type { ImageCardGridFragment } from "./ImageCardGrid/ImageCardGrid.query";
import type { ImageGridFragment } from "./ImageGrid/ImageGrid.query";
import type { ImageWithTextFragment } from "./ImageWithText/ImageWithText.query";
import type { InterstitialCtaFragment } from "./InterstitialCta/InterstitialCta.query";
import type { JobsListFragment } from "./JobsList/JobsList.query";
import type { LogoGridFragment } from "./LogoGrid/LogoGrid.query";
import type { NewsletterFormFragment } from "./NewsletterForm/NewsletterForm.query";
import type { PageHeaderFragment } from "./PageHeader/PageHeader.query";
import type { PagePartialFragment } from "./PagePartial/PagePartial.query";
import type { ResponsiveVideoFragment } from "./ResponsiveVideo/ResponsiveVideo.query";
import type { StructuredTextBlockFragment } from "./StructuredTextBlock/StructuredTextBlock.query";
import type { TeamGalleryFragment } from "./TeamGallery/TeamGallery.query";
import type { TextImageFragment } from "./TextImage/TextImage.query";
import type { TimelineBlockFragment } from "./TimelineBlock/TimelineBlock.query";

export type BlockRecord =
  | (FragmentOf<typeof BlogsSectionFragment> & {
      __typename: "SectionBlogsSectionRecord";
    })
  | (FragmentOf<typeof CaseListFragment> & {
      __typename: "SectionCaseListRecord";
    })
  | (FragmentOf<typeof DialogueCtaFragment> & {
      __typename: "SectionDialogueCtaRecord";
    })
  | (FragmentOf<typeof EventsSectionFragment> & {
      __typename: "SectionEventsSectionRecord";
    })
  | (FragmentOf<typeof GlossarySectionFragment> & {
      __typename: "SectionGlossaryRecord";
    })
  | (FragmentOf<typeof GroupingFragment> & {
      __typename: "SectionGroupingRecord";
    })
  | (FragmentOf<typeof ImageCardGridFragment> & {
      __typename: "SectionImageCardGridRecord";
    })
  | (FragmentOf<typeof ImageGridFragment> & {
      __typename: "SectionImageGridRecord";
    })
  | (FragmentOf<typeof ImageWithTextFragment> & {
      __typename: "SectionImageTextRecord";
    })
  | (FragmentOf<typeof InterstitialCtaFragment> & {
      __typename: "SectionInterstitialCtaRecord";
    })
  | (FragmentOf<typeof JobsListFragment> & {
      __typename: "SectionJobsListRecord";
    })
  | (FragmentOf<typeof LogoGridFragment> & {
      __typename: "SectionLogoGridRecord";
    })
  | (FragmentOf<typeof NewsletterFormFragment> & {
      __typename: "SectionNewsletterRecord";
    })
  | (FragmentOf<typeof PageHeaderFragment> & {
      __typename: "SectionHeaderRecord";
    })
  | (FragmentOf<typeof PagePartialFragment> & {
      __typename: "PagePartialBlockRecord";
    })
  | (FragmentOf<typeof ResponsiveVideoFragment> & {
      __typename: "SectionVideoRecord";
    })
  | (FragmentOf<typeof TeamGalleryFragment> & {
      __typename: "SectionTeamGalleryRecord";
    })
  | (FragmentOf<typeof TextImageFragment> & {
      __typename: "SectionTextImageRecord";
    })
  | (FragmentOf<typeof TimelineBlockFragment> & {
      __typename: "SectionTimelineRecord";
    })
  | (FragmentOf<typeof StructuredTextBlockFragment> & {
      __typename: "SectionStructuredTextRecord";
    })
  | (FragmentOf<typeof CtaBlockFragment> & {
      __typename: "CallToActionRecord";
    });
