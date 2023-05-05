<template>
  <main class="page-service grid">
    <page-header
      heading="headline"
      :byline="data.page.title"
      :headline="data.page.subtitle"
      :image="data.page.headerIllustration"
    />
    <series-navigation
      v-if="shownSeriesNavigation"
      class="page-service__series-navigation"
      :title-route="seriesNavigationTitleRoutes"
      :child-routes="seriesNavigationChildRoutes"
    />
    <article class="page-service__overview">
      <template v-for="item in data.page.items">
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
        <image-with-caption
          v-if="item.__typename === 'ImageRecord'"
          :key="item.id"
          :id="item.id"
          :image="item.image"
          :caption="item.caption"
        />
        <responsive-video
          :id="item.id"
          v-if="item.__typename === 'ResponsiveVideoRecord'"
          :key="item.id"
          :video="item.video"
          :gif="item.gif"
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
    <pivot-list
      class="page-service__pivots"
      v-if="data.page.pivots && data.page.pivots.length"
      :pivots="data.page.pivots"
      :can-have-border-top="false"
    />
  </main>
</template>

<script setup>
  import query from './index.query.graphql?raw';
  const { $localeUrl } = useNuxtApp();

  const { params } = useRoute();
  const { data } = await useFetchContent({
    query,
    variables: {
      slug: params.slug,
      locale: params.language,
    },
  });

  useSeoHead(data.value.page);

  const shownSeriesNavigation = computed(() => {
    if (!data.value.page.serviceSeries) {
      return null
    }

    if (data.value.page.serviceSeries.length === 1) {
      return data.value.page.serviceSeries[0]
    }

    return data.value.page.serviceSeries[0]
  });

  const seriesNavigationTitleRoutes = computed(() => {
    return {
      title: shownSeriesNavigation.value.mainService.title,
      route: $localeUrl({
        name: 'services-slug',
        params: {
          slug: shownSeriesNavigation.value.mainService.slug,
        },
      }),
    };
  });

  const seriesNavigationChildRoutes = computed(() => {
    return shownSeriesNavigation.value.childServices.map(service => ({
      title: service.title,
      route: $localeUrl({ name: 'services-slug', params: { slug: service.slug } })
    }))
  });
</script>

<style>
  .page-service .page-header {
    margin-bottom: var(--spacing-large);
  }

  .page-service__pivots .newsletter-form,
  .page-service__pivots .contact-form {
    background-color: var(--bg-pastel);
  }

  .page-service__pivots {
    grid-row: 4;
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

  .page-service__overview > .image-with-caption,
  .page-service__overview .generic-text-block,
  .page-service__overview .blockquote-block,
  .page-service__overview > .responsive-video {
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

    .page-service__overview > .image-with-caption,
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
