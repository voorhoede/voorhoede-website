import { graphql } from "~/utils/graphql";

export const NewsletterFormFragment = graphql(`
  fragment NewsletterFormFragment on SectionNewsletterRecord {
    id
    backgroundColor
  }
`);
