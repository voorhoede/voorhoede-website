import { graphql } from "~/utils/graphql";
import { LinkFragment } from "~/components/Core/AppLink/AppLink.query";

export const ImageCardGridFragment = graphql(
  `
    fragment ImageCardGridFragment on SectionImageCardGridRecord {
      title
      backgroundColor
      cardOrientation
      items {
        id
        title
        body {
          value
        }
        image {
          url
          alt
          width
          height
        }
        links {
          ...LinkFragment
        }
      }
    }
  `,
  [LinkFragment],
);
