import { graphql } from "~/utils/graphql";
import { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

export const DialogueCtaBlockFragment = graphql(
  `
    fragment DialogueCtaBlockFragment on SectionDialogueCtaRecord {
      variant
      title
      body(markdown: true)
      backgroundColor
      person {
        image {
          url
          alt
          width
          height
        }
      }
      ctas {
        ...LinkToRecordFragment
      }
    }
  `,
  [LinkToRecordFragment],
);
