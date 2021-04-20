<template>
  <div>
    <main
      id="content"
      class="page-service grid"
      tabindex="-1"
    >
      <page-header
        heading="headline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      />
      <series-navigation
        v-if="shownSeriesNavigation"
        class="page-service__series-navigation"
        :title-route="seriesNavigationTitleRoutes"
        :child-routes="seriesNavigationChildRoutes"
      />
      <article class="page-service__overview">
        <template v-for="item in page.items">
          <generic-text-block
            v-if="item.__typename === 'GenericTextBlockRecord'"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :body="item.body"
            :image="item.image"
          />
          <testimonial-block
            v-if="item.__typename === 'TestimonialBlockRecord'"
            :key="item.id"
            :id="item.id"
            :testimonial="item.testimonial"
          />
          <responsive-image
            v-if="item.__typename === 'ImageRecord'"
            :key="item.id"
            :id="item.id"
            :image="item.image"
            :caption="item.caption"
            :has-fixed-ratio="true"
          />
          <responsive-video
            :id="item.id"
            v-if="item.__typename === 'ResponsiveVideoRecord'"
            :key="item.id"
            :video="item.video"
            :autoplay="item.autoplay"
            :loop="item.loop"
            :mute="item.autoplay"
          />
          <cta-block
            v-if="item.__typename === 'CallToActionRecord'"
            :key="item.id"
            :id="item.id"
            :item="item"
          />
        </template>
      </article>
      <breadcrumbs-block
        :back-link="backLinkRoute"
        :back-link-label="backLinkLabel"
        :next-link="nextLinkRoute"
        :next-link-label="nextLinkLabel"
      />
    </main>
    <pivot-list
      class="page-service__pivots"
      v-if="page.pivots && page.pivots.length"
      :pivots="page.pivots"
      :can-have-border-top="false"
    />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  import asyncPage from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import { enforceTrailingSlash } from '~/plugins/locale-urls'

  import {
    SET_PREVIOUS_SERVICE_TITLE,
    SET_PREVIOUS_SERVICE_SERIES_NAVIGATION
  } from '~/store/mutation-types'

  export default {
    async asyncData(context) {
      try {
        const data = await asyncPage(context)

        if (!data.page) {
          throw 'Invalid page data'
        }

        /**
         * The breadcrumbs back link is linking to the previous route when available
         * and when the previous route is also a service page.
         * However, the breadcrumbs next route could also be the same as this previous route.
         * In that case, a link back to the services overview is displayed.
         * Also, when no previous route is known, a link back to the service overview page is shown.
         */
        const previousRouteIsServiceSlugPage = context.from && context.from.name === context.route.name
        const breadcrumbsNextServiceIsPreviousRoute = (
          previousRouteIsServiceSlugPage
          && data.page.breadcrumbsNextService
          && data.page.breadcrumbsNextService.slug === context.from.params.slug
        )
        const services = context.app.localePath('services')
        const servicesRoute = enforceTrailingSlash(services)
        const useFallbackBackRoute = !previousRouteIsServiceSlugPage || breadcrumbsNextServiceIsPreviousRoute
        const backLinkRoute = useFallbackBackRoute ? servicesRoute : context.from

        return {
          ...data,
          useFallbackBackRoute,
          backLinkRoute,
          previousRouteIsServiceSlugPage,
          // Don't use mapState for previousServiceTitle and previousServiceSeriesNavigation, as it will be replaced on mounted
          previousServiceTitle: context.store.state.previousServiceTitle,
          previousServiceSeriesNavigation: context.store.state.previousServiceSeriesNavigation
        }
      } catch (error) {
        return context.error({ statusCode: 404 })
      }
    },
    computed: {
      /**
       * The series navigation is dependent on the previous route.
       * Some service pages are configured in the CMS to be part of multiple service series.
       * In that case, we make sure the same series navigation is shown as on the previous page,
       * but only when the series navigation of the previous service page
       * is allowed on the current service page.
       * We fallback to the first on in the array, when no matches are found.
       */
      shownSeriesNavigation() {
        if (!this.page.serviceSeries) {
          return null
        }

        if (this.page.serviceSeries.length === 1) {
          return this.page.serviceSeries[0]
        }

        const validPreviousServiceSeriesNavigation = this.previousServiceSeriesNavigation
          && this.page.serviceSeries.find(
            series => (
              series.id === this.previousServiceSeriesNavigation.id
            )
          )

        if (
          this.previousRouteIsServiceSlugPage
          && this.previousServiceSeriesNavigation
          && validPreviousServiceSeriesNavigation
        ) {
          return validPreviousServiceSeriesNavigation
        }

        return this.page.serviceSeries[0]
      },
      seriesNavigationTitleRoutes() {
        return {
          title: this.shownSeriesNavigation.mainService.title,
          route: this.getServiceRoute(this.shownSeriesNavigation.mainService.slug)
        }
      },
      seriesNavigationChildRoutes() {
        return this.shownSeriesNavigation.childServices.map(service => ({
          title: service.title,
          route: this.getServiceRoute(service.slug)
        }))
      },
      backLinkLabel() {
        return this.useFallbackBackRoute ? this.$t('back_to_services') : this.previousServiceTitle
      },
      nextLinkRoute() {
        return this.page.breadcrumbsNextService && this.localeUrl({
          name: 'services-slug',
          params: { slug: this.page.breadcrumbsNextService.slug }
        })
      },
      nextLinkLabel() {
        return this.page.breadcrumbsNextService && this.page.breadcrumbsNextService.title
      }
    },
    // Set on mounted as beforeDestroy will trigger just after asyncData
    mounted() {
      this.SET_PREVIOUS_SERVICE_TITLE(this.page.title)
      this.SET_PREVIOUS_SERVICE_SERIES_NAVIGATION(this.shownSeriesNavigation)
    },
    methods: {
      ...mapMutations([SET_PREVIOUS_SERVICE_TITLE, SET_PREVIOUS_SERVICE_SERIES_NAVIGATION]),
      getServiceRoute(slug) {
        return this.localeUrl({
          name: 'services-slug',
          params: {
            slug
          }
        })
      }
    },
    head,
  }
</script>

<style>
  .page-service .page-header {
    margin-bottom: var(--spacing-large);
  }

  .page-service__pivots .newsletter-form,
  .page-service__pivots .contact-form {
    background-color: var(--bg-pastel);
  }

  .page-service__series-navigation {
    margin-bottom: var(--spacing-large);
    grid-row: 2;
  }

  .page-service__overview {
    display: flex;
    grid-row: 3;
    flex-direction: column;
  }

  .page-service__overview > .responsive-image,
  .page-service__overview .generic-text-block,
  .page-service__overview .blockquote-block,
  .page-service__overview > .responsive-video {
    grid-row: 4;
    margin: 0 0 var(--spacing-large) 0;
  }

  .page-service__overview .cta-image-block {
    margin-bottom: var(--spacing-big);
    padding-top: var(--spacing-large);
  }

  .page-service__overview .blockquote-block__title {
    font-size: 1.3rem;
    line-height: 1.2;
  }

  .page-service__overview .blockquote-block__body {
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .page-service__overview .generic-text-block__title {
    font-size: 1.5rem;
    line-height: 1.2083333333;
  }

  .page-service__overview .generic-text-block__body {
    font-size: 1.125rem;
    line-height: 1.6666666667;
  }

  .page-service .breadcrumbs-block {
    margin-bottom: var(--spacing-large);
    grid-row: 5;
  }

  @media (min-width: 720px) {
    .page-service .page-header {
      margin-bottom: var(--spacing-big);
    }

    .page-service__series-navigation {
      margin-bottom: var(--spacing-larger);
      grid-column: var(--grid-content);
    }

    .page-service__overview {
      grid-column: var(--grid-content);
    }

    .page-service__overview .generic-text-block {
      grid-template-columns: 70% 1fr;
    }

    .page-service__overview .blockquote-block,
    .page-service__overview .cta-image-block {
      width: 70%;
    }

    .page-service__overview .blockquote-block__title {
      font-size: 1.4rem;
      line-height: 1.2;
    }

    .page-service__overview .blockquote-block__body {
      font-size: 1.2rem;
      line-height: 1.5;
    }

    .page-service__overview .generic-text-block__body {
      font-size: 1.25rem;
      line-height: 1.75;
    }

    .page-service__overview .generic-text-block__title {
      font-size: 1.6875rem;
      line-height: 1.3333333333;
    }

    .page-service__overview > .responsive-image,
    .page-service__overview > .responsive-video,
    .page-service__overview > .testimonial-block {
      width: 70%;
    }
  }

  @media (min-width: 1100px) {
    .page-service__overview,
    .page-service .breadcrumbs-block {
      grid-column-start: 4;
      grid-column-end: 48;
    }

    .page-service__series-navigation {
      grid-column-start: 4;
      grid-column-end: 35;
    }

    .page-service__overview .blockquote-block__body,
    .page-service__overview .generic-text-block__body {
      font-size: 1.375rem;
      line-height: 1.8181818182;
    }

    .page-service__overview .blockquote-block__title,
    .page-service__overview .generic-text-block__title {
      font-size: 2.0625rem;
      line-height: 1.3636363636;
    }

    .page-service .breadcrumbs-block {
      margin-top: var(--spacing-larger);
      margin-bottom: var(--spacing-larger);
    }
  }
</style>
