import type { RouteLocationRaw } from "vue-router";
import { graphql, type FragmentOf, readFragment } from "~/utils/graphql";

export const LinkFragment = graphql(`
  fragment LinkFragment on RecordInterface {
    __typename
    ... on ExternalLinkRecord {
      id
      title
      url
      style
    }
    ... on InternalLinkRecord {
      id
      title
      style
      link {
        __typename
        ... on PageRecord {
          slug
        }
        ... on BlogPostRecord {
          slug
        }
        ... on CaseItemRecord {
          slug
        }
        ... on EventItemRecord {
          slug
        }
        ... on JobRecord {
          slug
        }
        ... on ServiceRecord {
          slug
        }
        ... on PersonRecord {
          slug
        }
        ... on MeetRecord {
          parents: _allReferencingPeople {
            __typename
            slug
          }
        }
        ... on ContactRecord {
          id
        }
      }
    }
  }
`);

export type ResolvedLink = {
  label: string;
  to: string | RouteLocationRaw;
  style: string | null;
};

/**
 * Unwrap a CMS link record (Internal/External) into flat props for `Core/AppLink`.
 */
export function resolveLink(linkRef: FragmentOf<typeof LinkFragment>): ResolvedLink {
  const link = readFragment(LinkFragment, linkRef);

  if (link.__typename === "ExternalLinkRecord") {
    return { label: link.title, to: link.url, style: link.style };
  }

  if (link.__typename === "InternalLinkRecord") {
    return { label: link.title, to: useDatoNuxtRoute(link.link) ?? "/", style: link.style };
  }

  return { label: "", to: "/", style: null };
}
