import { graphql } from "~/utils/graphql";
import { LinkFragment } from "~/components/Core/AppLink/AppLink.query";

export const DialogueCtaFragment = graphql(
  `
    fragment DialogueCtaFragment on SectionDialogueCtaRecord {
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
