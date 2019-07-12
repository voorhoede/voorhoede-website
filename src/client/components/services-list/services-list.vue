<template>
  <ul class="services-list">
    <li
      v-for="service in services"
      :key="service.ctaLink"
      class="services-list__item">
      <service-excerpt
        :tagline="service.tagline"
        :title="service.title"
        :summary="service.summary"
        :slug="service.slug"
      />
    </li>
  </ul>
</template>

<script>
import ServiceExcerpt from '../service-excerpt'

export default {
  components: { ServiceExcerpt },
  props: {
    services: {
      type: Array,
      required: true,
      validator(services) {
        return services.every(service => typeof service === 'object')
      },
    }
  },
}
</script>

<style>
  :root {
    --services-list-border: 1px solid var(--very-dim);
  }

  .services-list__item {
    margin-bottom: var(--spacing-larger);
    padding-bottom: var(--spacing-large);
    border-bottom: var(--services-list-border);
  }

  .services-list__item:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 720px) {
    .services-list {
      display: flex;
    }

    .services-list__item {
      display: flex;
      flex: 1 1 0%; /* a flex-basis of 0 makes all columns equal, but IE11 needs a unit in flex-basis for it to work */
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .services-list__item:first-child {
      margin-right: var(--spacing-medium);
      padding-right: var(--spacing-medium);
      border-right: var(--services-list-border);
    }

    .services-list__item:last-child {
      padding-left: var(--spacing-medium);
      margin-left: var(--spacing-medium);
      border-left: var(--services-list-border);
    }
  }

  @media (min-width: 1100px) {
    .services-list__item:first-child {
      margin-right: var(--spacing-larger);
      padding-right: var(--spacing-larger);
    }

    .services-list__item:last-child {
      padding-left: var(--spacing-larger);
      margin-left: var(--spacing-larger);
    }
  }
</style>
