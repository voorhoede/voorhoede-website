import { graphql } from "~/utils/graphql";
import { LinkFragment } from "~/components/Core/AppLink/AppLink.query";

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
        ...LinkFragment
      }
    }
  `,
  [LinkFragment],
);
