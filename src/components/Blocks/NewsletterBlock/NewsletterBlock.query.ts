import { graphql } from "~/utils/graphql";

export const NewsletterBlockFragment = graphql(`
  fragment NewsletterBlockFragment on SectionNewsletterRecord {
    backgroundColor
  }
`);
