/**
 * Pages checked by the accessibility tests: one or two URLs per page template
 * in `src/pages/[language]/`. Content comes from DatoCMS, so detail pages need
 * slugs that exist there. If a slug disappears, the test for it fails with a
 * non-200 status; replace it with another page of the same template.
 *
 * Not covered: `jobs/[slug]` and `meet/[slug]`, which have no published pages
 * to point at. Add a URL here once they do.
 */
export const pages: string[] = [
  // [language]/index.vue
  '/en/',
  '/nl/',

  // [language]/[...slug]/index.vue (generic slug page)
  '/en/about-us/',

  // [language]/blog/
  '/en/blog/',
  '/en/blog/page/2/',
  '/en/blog/say-no-to-image-reflow/',
  '/en/blog/tag/performance/',
  '/en/blog/tag/performance/page/2/',

  // [language]/cases/
  '/en/cases/',
  '/en/cases/geldmaat/',

  // [language]/services/
  '/en/services/',
  '/en/services/project-kick-start/',

  // [language]/events/
  '/en/events/',
  '/en/events/ai/',

  // [language]/contact/
  '/en/contact/',
  '/nl/contact/',
  '/en/contact/confirmation/',

  // [language]/team/
  '/en/team/peter/',

  // [language]/energy-first/
  '/en/energy-first/',
];
