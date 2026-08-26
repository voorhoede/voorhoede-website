import { graphql } from "~/utils/graphql";
import { BodyBlocksFragment } from "~/components/Blocks/bodyBlocks.query";
import { ReachOutBlockFragment } from "~/components/Blocks/ReachOutBlock/ReachOutBlock.query";

export const blogSlugQuery = graphql(
  `
    query BlogSlug($locale: SiteLocale, $slug: String) {
      page: blogPost(locale: $locale, filter: { slug: { eq: $slug } }) {
        id
        slug
        i18nSlugs: _allSlugLocales {
          locale
          value
        }
        title
        subtitle
        isArchived
        headerIllustration {
          url
          alt
          width
          height
        }
        date: _firstPublishedAt
        authors {
          name
          lastName
          slug
          image {
            url
            alt
            width
            height
          }
        }
        introTitle
        seo {
          title
          description
          image {
            url
          }
        }
        bodyBlocks {
          ...BodyBlocksFragment
        }
        reachOut {
          ...ReachOutBlockFragment
        }
        relatedBlogPosts {
          slug
          title
          date: _firstPublishedAt
          authors {
            name
            image {
              url
              alt
              width
              height
            }
          }
        }
        tags {
          id
          title
          slug
          blogPosts: _allReferencingBlogPosts(
            first: 3
            filter: { slug: { neq: $slug } }
          ) {
            slug
            title
            date: _firstPublishedAt
            authors {
              name
              image {
                url
                alt
                width
                height
              }
            }
          }
        }
        onMountedScript
        onUnmountedScript
      }
    }
  `,
  [BodyBlocksFragment, ReachOutBlockFragment],
);
