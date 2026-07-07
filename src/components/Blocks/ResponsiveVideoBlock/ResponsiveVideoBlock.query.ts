import { graphql } from "~/utils/graphql";

export const ResponsiveVideoBlockFragment = graphql(`
  fragment ResponsiveVideoBlockFragment on SectionVideoRecord {
    autoplay
    loop
    mute
    caption
    video {
      url
      title
      height
      width
      provider
      providerUid
      thumbnailUrl
    }
  }
`);
