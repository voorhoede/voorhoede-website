import { graphql } from "~/utils/graphql";

export const LocationsListBlockFragment = graphql(`
  fragment LocationsListBlockFragment on LocationsListRecord {
    id
    title
    items {
      id
      title
      body
      address
      postalCode
      city
      countryCode
      googleMaps
      image {
        url
        alt
        width
        height
      }
    }
  }
`);
