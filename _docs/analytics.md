# Analytics

We track our website. In order to keep our reporting tools aligned tracking is versioned. Below you can find the current version with the setup (9-10-2020). Versioning strategy: "major.minor.patch". For datastudio tracking version can be filtered in the settings -> models -> app section.

## v2.0.0
Since version 1.0.0 we migrated to Google Tag Manger(GTM). This helps a more agile workflow for analytics, removes a lot of analytics code from the code base and cuts out any software development.

Which tracking tags are currently set:
(Tag ID's are set in GTM and the GTM id is set in the CMS. All can be managed with our admin account)
- Google Tag Manager
  - Google Analytics (GTM)
  - Google Ads (GTM)

What is tracked:
(This is fully managed in GTM and only reflects the current situation)
- Google Analytics
  - Pageviews
  - Blog page scroll depth
  - Outbound links (all as UA events covering cta clicks)
  - Video start
  - Social share
- Google Ads  
  - Ad conversions

Custom dimension:
We use custom dimensions to version our analytics data and filter views in Google analytics reporting.
1. Tracking version: set in Dato
2. Environment name: set by server
3. Tracking transport: set in code base to be able to test different tracking methods

Exceptions:

- when user has "Do Not Track" browser setting enabled no hits are sent.

Reporting:
- Google Analytics reports
- Google Ads dashboard
- Datastudio: https://datastudio.google.com/open/1jf5FDal5JB1O3pKJxgM0IbuMq_cuHsCr


## v1.0.0
This version implemented vue-analytics with analytics.js

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
  - pivot-list:
    - click event cta
- Datastudio:
  - https://datastudio.google.com/open/1jf5FDal5JB1O3pKJxgM0IbuMq_cuHsCr
