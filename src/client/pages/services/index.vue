<template>
  <main class="page-services grid">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle" />

    <image-with-text-block
      v-if="page.introTitle && page.introBody && page.introImage"
      :title="page.introTitle"
      :body="page.introBody"
      :image="page.introImage"
      :inverse="true"
      class="page-services__intro"
    />

    <interstitial-cta
      v-if="page.contactBody"
      :cta="page.contactBody"
      :buttons="[
        { label: $t('get_in_touch'), to: localeUrl('contact') },
      ]"
    />

    <div class="page-services__services-list">
      <h2 v-if="page.servicesTitle" class="h2">{{ page.servicesTitle }}</h2>
      <ul>
        <li
          v-for="(service, index) in page.services"
          :key="service.ctaLink">
          <service-excerpt
            :title="service.excerptTitle"
            :slug="service.slug"
            :image="service.cardImage"
            :body="service.cardBody"
            :body-long="service.cardBodyLong"
            :is-flipped="index % 2 !== 0"
          />
          <services-shortlinks
            class="page-services__shortlinks"
            :class="{'page-services__shortlinks--indented': index % 2 == 0}"
            :services="childServices(service.slug)"
          />
        </li>
      </ul>
    </div>

    <rich-text-block
      v-if="page.smallServices"
      class="page-services__text"
      :text="page.smallServices" />

    <pivot-list
      class="page-services__pivots"
      v-if="page.pivots && page.pivots.length"
      :pivots="page.pivots"
      :can-have-border-top="false"
    />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  export default {
    asyncData,
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
    methods: {
      childServices(slug) {
        const { serviceSeries } = this.page.services.find(service => service.slug === slug)
        return serviceSeries[0].childServices
      },
    },
    head,
  }
</script>

<style>
  .page-services {
    background-color: var(--bg-pastel);
  }

  .page-services > * {
    margin-bottom: var(--spacing-large);
  }

  .page-services > *:last-child {
    margin-bottom: var(--spacing-bigger);
  }

  .page-services__intro {
    grid-column: var(--grid-page);
  }

  .page-services__pivots .newsletter-form {
    background-color: var(--bg-pastel);
  }

  .page-services__services-list {
    grid-row: 4;
    grid-column: var(--grid-content);
    margin-bottom: var(--spacing-larger);
  }

  .page-services__services-list > h2 {
    margin-bottom: var(--spacing-small);
    text-align: center;
  }

  .page-services__services-list ul {
    list-style: none;
  }

  .page-services__services-list ul > * + * {
    margin-top: var(--spacing-large);
  }

  .page-services__shortlinks {
    margin-top: var(--spacing-small);
    margin-left: var(--spacing-medium);
  }

  .page-services__text {
    grid-row: 4;
  }

  @media (min-width: 720px) {
    .page-services__intro {
      grid-column: var(--grid-content);
    }

    .page-services__text {
      grid-column-start: 8;
      grid-column-end: 44;
      text-align: center;
      max-width: var(--small-services-width);
    }

    .page-services__services-list > h3 {
      margin-bottom: var(--spacing-large);
    }

    .page-services__services-list ul > * + * {
      margin-top: var(--spacing-larger);
    }

    .page-services__shortlinks {
      margin-top: var(--spacing-medium);
    }

    .page-services__shortlinks--indented {
      margin-left: 40%;
    }
  }

  @media (min-width: 1100px) {
    .page-services > * {
      margin-bottom: var(--spacing-big);
    }

    .page-services__services-list ul > * + * {
      margin-top: var(--spacing-big);
    }

    .page-services__services-list > h3 {
      margin-bottom: var(--spacing-larger);
    }

    .page-services__shortlinks:not(.page-services__shortlinks--indented) {
      margin-left: var(--spacing-larger);
    }
  }

  @media (min-width: 1200px) {
    .page-services__services-list {
      grid-column: var(--grid-content-narrow);
    }
  }
</style>
