<template>
  <div>
    <main class="page-service grid">
      <page-header
        heading="headline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      />
      <series-navigation
        v-if="page.servicePageSeries"
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
          <responsive-image
            v-if="item.__typename === 'ImageRecord'"
            :key="item.id"
            :id="item.id"
            :image="item.image"
            :caption="item.caption"
            :has-fixed-ratio="true"
          />
          <blockquote-block
            v-if="item.__typename === 'CallToActionRecord'"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :body="item.body"
            :link-label="item.linkLabel"
            :link-url="item.linkUrl"
            :link-is-external="item.linkIsExternal"
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

  import { SET_PREVIOUS_SERVICE_TITLE } from '~/store/mutation-types'
  import BreadcrumbsBlock from '~/components/breadcrumbs-block'
  import GenericTextBlock from '~/components/generic-text-block'
  import PageHeader from '~/components/page-header'
  import PivotList from '~/components/pivot-list'
  import BlockquoteBlock from '~/components/blockquote-block'
  import ResponsiveImage from '~/components/responsive-image'
  import SeriesNavigation from '~/components/series-navigation'

  export default {
    components: {
      BreadcrumbsBlock,
      GenericTextBlock,
      PageHeader,
      PivotList,
      BlockquoteBlock,
      ResponsiveImage,
      SeriesNavigation,
    },
    async asyncData(context) {
      try {
        const data = await asyncPage(context)

        if (!data.page) {
          'Invalid page data'
        }

        const previousRouteIsServiceSlugPage = context.from && context.from.name === context.route.name
        const breadcrumbsNextServiceIsPreviousRoute = (
          previousRouteIsServiceSlugPage
          && data.page.breadcrumbsNextService
          && data.page.breadcrumbsNextService.slug === context.from.params.slug
        )
        const useFallbackBackRoute = !previousRouteIsServiceSlugPage || breadcrumbsNextServiceIsPreviousRoute
        const backLinkRoute = useFallbackBackRoute ? context.app.localePath('services') : context.from

        return {
          ...data,
          useFallbackBackRoute,
          backLinkRoute,
          // Don't use mapState for previousServiceTitle, as it will be replaced on mounted
          previousServiceTitle: context.store.state.previousServiceTitle
        }
      } catch (error) {
        return context.error({ statusCode: 404 })
      }
    },
    computed: {
      seriesNavigationTitleRoutes() {
        return {
          title: this.page.servicePageSeries.mainService.title,
          route: this.getServiceRoute(this.page.servicePageSeries.mainService.slug)
        }
      },
      seriesNavigationChildRoutes() {
        return this.page.servicePageSeries.childServices.map(service => ({
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
    },
    methods: {
      ...mapMutations([SET_PREVIOUS_SERVICE_TITLE]),
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

  .page-service__overview .responsive-image,
  .page-service__overview .generic-text-block,
  .page-service__overview .blockquote-block {
    grid-row: 4;
    margin: 0 0 var(--spacing-large) 0;
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

    .page-service__overview .responsive-image {
      width: 70%;
    }
  }

  @media (min-width: 1100px) {
    .page-service__series-navigation,
    .page-service__overview {
      grid-column-start: 4;
      grid-column-end: 48;
    }

    .page-service__series-navigation {
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
  }
</style>
