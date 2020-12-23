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
  .services-list__item > * {
    min-height: 100%;
    max-width: 340px;
    margin-right: auto;
    margin-left: auto;
  }

  @media (min-width: 720px) {
    .services-list {
      display: grid;
      grid-template-columns: 1fr var(--spacing-large) 1fr;
    }

    .services-list__item:nth-child(1) {
      grid-column: 1;
    }

    .services-list__item:nth-child(2) {
      grid-column: 3;
    }

    .services-list__item:nth-child(3) {
      grid-column: 1 / -1;
      margin-top: var(--spacing-medium);
    }

    .services-list__item > * {
      max-width: 430px;
    }
  }

  @media (min-width: 1000px) {
    .services-list {
      grid-template-columns: 1fr var(--spacing-large) 1fr var(--spacing-large) 1fr;
    }

    .services-list__item:nth-child(3) {
      grid-column: 5;
      margin-top: 0;
    }

    .services-list__item > * {
      max-width: none;
    }
  }
</style>
