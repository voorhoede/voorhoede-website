<template>
  <main class="page-job">
    <page-header
      heading="headline"
      :byline="data.page.subtitle"
      :headline="data.page.title"
      :image="data.page.jobImage"
    />
    <div class="grid">
      <div
        v-if="data.page.isClosed"
        class="page-job__closed"
      >
        <p class="h4">
          {{ $t('apply_closed') }}
        </p>

        <app-button
          class="page-job__closed-button"
          :label="$t('all_jobs')"
          :to="$localeUrl({ name: 'slug', params: { slug: data.overview.page.slug } })"
        />
      </div>

      <div class="page-job__content">
        <template v-for="item in data.page.jobContent">
          <generic-text-block
            v-if="item._modelApiKey === 'generic_text_block'"
            :key="item.id"
            :is-nested="false"
            :title="item.title"
            :body="item.body"
            :image="item.image"
          />
          <gallery-block
            v-if="item._modelApiKey === 'gallery_block'"
            :key="item.id"
            :images="item.gallery.images"
            class="page-job__gallery"
          />
        </template>
        <footer class="page-job__footer button-group">
          <h2 class="page-job__title h3">
            {{ data.page.isClosed? $t('apply_title_closed') : $t('apply_title') }}
          </h2>

          <app-button
            :label="$t('apply')"
            :to="data.page.url"
            @click="trackApplyButton"
            v-if="!data.page.isClosed"
            external
          />
          <app-button
            :label="$t('all_jobs')"
            :to="$localeUrl({ name: 'slug', params: { slug: data.overview.page.slug } })"
            :secondary="!data.page.isClosed"
          />
          <scroll-to direction="up" />
        </footer>
      </div>
    </div>
  </main>
</template>

<script setup>
  definePageMeta({ layout: 'content-page' });

  import query from './[slug].query.graphql?raw';

  const { params } = useRoute();

  const { data } = await useFetchContent({
    query,
    variables: {
      slug: params.slug,
      locale: params.language,
    },
  });

  useSeoHead(data.value.page);

  function baseSalary() {
    const { maxSalary, minSalary } = data.value.page;

    if (!minSalary || !maxSalary) { return null }

    return {
      '@type': 'MonetaryAmount',
      'currency': 'EUR',
      'value': {
        '@type': 'QuantitativeValue',
        'minValue': parseFloat(minSalary, 10).toFixed(2),
        'maxValue': parseFloat(maxSalary, 10).toFixed(2),
        'unitText': 'MONTH',
      }
    }
  }

  function jobLocation(place) {
    return {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': place.address,
        'addressLocality': place.city,
        'postalCode': place.postalCode,
        'addressCountry': place.countryCode,
      },
    };
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: data.value.page.title,
    'description': data.value.page.jobDescription,
    'datePosted': data.value.page._publishedAt,
    ...(data.value.page.validUntil && { 'validThrough': data.value.page.validUntil }),
    'employmentType': data.value.page.employmentType.toUpperCase().replace(' ', '_'),
    'hiringOrganization': {
      '@type': 'Organization',
      'name': 'De Voorhoede',
      'url': 'https://www.voorhoede.nl',
      'logo': 'https://www.voorhoede.nl/images/social/logo-wide.jpg',
    },
    jobLocation: data.value.page.location.map(jobLocation),
    ...(baseSalary && { baseSalary: baseSalary() }),
  }

  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData) }],
  });

  function trackApplyButton() {
    useTrackEvent('Click on Apply');
  }
</script>

<style>
  :root {
    --button-group-width: 350px;
  }

  .page-job .page-header {
    margin-bottom: var(--spacing-large);
  }

  .page-job__content > * {
    margin-bottom: var(--spacing-large);
  }

  .page-job__content .scroll-to {
    display: none;
    position: absolute;
    bottom: var(--spacing-big);
    right: var(--spacing-larger);
  }

  .page-job__title {
    margin-bottom: var(--spacing-tiny);
  }

  .page-job__gallery {
    margin-top: var(--spacing-larger);
    margin-bottom: var(--spacing-big);
  }

  .page-job__footer {
    margin-bottom: var(--spacing-large);
  }

  .page-job__footer .app-button {
    white-space: nowrap;
    margin-top: var(--spacing-small);
  }

  .page-job__footer .app-button:not(:first-of-type) {
    margin-left: var(--spacing-small);
  }

  .page-job__closed {
    margin-bottom: var(--spacing-large);
    background-color: var(--white);
  }

  .page-job__closed .app-button {
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    .page-job {
      background-color: var(--bg-pastel);
    }

    .page-job__content {
      position: relative;
      grid-column: var(--grid-content);
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }

    .page-job__content .scroll-to {
      display: flex;
    }

    .page-job__content .button-group {
      width: var(--button-group-width);
    }

    .page-job__title {
      margin-bottom: var(--spacing-small);
    }

    .page-job__footer .app-button {
      margin-top: 0;
    }

    .page-job__closed {
      grid-column: var(--grid-content);
      padding: var(--spacing-large) var(--spacing-larger);
      display: grid;
      grid-template-columns: 63% 1fr;
    }

    .page-job__closed-button {
      grid-row: 2;
      width: fit-content;
    }
  }

  @media (min-width: 1100px) {
    .page-job__content, .page-job__closed {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger) var(--spacing-bigger);
    }
  }
</style>
