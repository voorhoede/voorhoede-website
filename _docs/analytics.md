# Analytics

We track our website. In order to keep tools like our datastudio dashboard aligned the event tracking is versioned. Below you can find the current version with the tracked events for each component and the corresponding datastudio link.

The tracking version can be managed from datastudio in the settings -> models -> app section. Versioning strategy: major.minor.patch

## v1.0.0

- Pageviews:
  - https://github.com/MatteoGabriele/vue-analytics
  - /config/nuxt/modules/google-analytics.js
- Pages:
  - blog/_slug:
    - article scrolled to end event
- Components:
  - app-footer:
    - in view
    - click event contact
  - social-share-buttons:
    - share event web
    - share event mobile native
  - responsive-video:
    - start play event
  - pivot-section:
    - click event cta
- Datastudio:
  - https://datastudio.google.com/open/1jf5FDal5JB1O3pKJxgM0IbuMq_cuHsCr
