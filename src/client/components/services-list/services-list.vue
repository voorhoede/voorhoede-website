<template>
  <ul class="services-list grid">
    <li
      v-for="service in services"
      :key="service.ctaLink"
      class="services-list__item">
      <service-excerpt
        :title="service.excerptTitle"
        :slug="service.slug"
        :image="service.cardImage"
        :body="service.cardBody"
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
  .services-list {
    grid-column: 1 / 51;
  }

  .services-list__item > * {
    min-height: 100%;
  }

  @media (max-width: 719px) {
    .services-list__item + .services-list__item {
      margin-top: var(--spacing-medium);
    }
  }

  @media (min-width: 720px) {
    .services-list {
      grid-column: var(--grid-content);
    }

    .services-list__item:nth-child(odd) {
      grid-column: 1 / 25;
    }

    .services-list__item:nth-child(even) {
      grid-column: 27 / 51;
    }

    .services-list__item:nth-child(n+3) {
      margin-top: var(--spacing-large);
    }
  }

  @media (min-width: 1100px) {
    .services-list__item:nth-child(odd) {
      grid-column: var(--grid-page-left);
    }

    .services-list__item:nth-child(even) {
      grid-column: var(--grid-page-right);
    }

    .services-list__item:nth-child(n+3) {
      margin-top: var(--spacing-larger);
    }
  }
</style>
