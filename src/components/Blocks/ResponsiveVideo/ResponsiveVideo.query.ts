import { graphql } from "~/utils/graphql";

export const ResponsiveVideoFragment = graphql(`
  fragment ResponsiveVideoFragment on SectionVideoRecord {
    id
    mute
    loop
    autoplay
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
