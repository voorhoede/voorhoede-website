import { type FragmentOf, readFragment } from "~/utils/graphql";
import { LinkFragment } from "~/components/Core/AppLink/AppLink.query";

export type ResolvedLink = {
  label: string;
  style: string | null;
};

/**
 * Unwrap a CMS link record (Internal/External) into presentational props (label,
 * style) for rendering. Destination + external-ness are resolved by `AppLink` itself
 * from the record's `__typename`.
 */
export function resolveLink(linkRef: FragmentOf<typeof LinkFragment>): ResolvedLink {
  const link = readFragment(LinkFragment, linkRef);

  if (link.__typename === "ExternalLinkRecord" || link.__typename === "InternalLinkRecord") {
    return { label: link.title, style: link.style };
  }

  return { label: "", style: null };
}
