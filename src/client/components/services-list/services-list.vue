<template>
  <div class="services-list grid">
    <ul class="services-list__list">
      <li
        v-for="service in services"
        :key="service.ctaLink"
        class="services-list__item"
      >
        <service-excerpt
          :title="service.title"
          :subtitle="service.subtitle"
          :characteristics="service.characteristics"
          :href="service.href"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { AppButton, ServiceExcerpt } from '~/components'

export default {
  components: { AppButton, ServiceExcerpt },
  props: {
    services: {
      type: Array,
      required: true,
      validator(services) {
        return services.every(service => {
          return service instanceof Object &&
            typeof service.title === 'string' &&
            typeof service.subtitle === 'string' &&
            typeof service.characteristics === 'object' && service.characteristics.length &&
            typeof service.href === 'string'
        })
      },
    },
  },
}
</script>

<style>
:root {
  --services-list-border: 1px solid var(--very-dim);
  --services-list-columns: 3;
  --services-list-item-spacing: var(--spacing-large);
  --services-list-item-width: calc(
    100% / var(--services-list-columns)
    - (var(--services-list-columns) - 1) / var(--services-list-columns) * var(--services-list-item-spacing)
  );
}

.services-list__item {
  margin-bottom: var(--spacing-larger);
  padding-bottom: var(--spacing-large);
  border-bottom: var(--services-list-border);
}

@media screen and (min-width: 720px) {
  .services-list__list {
    display: flex;
  }

  .services-list__item {
    margin-bottom: 0;
    padding-bottom: 0;
    width: var(--services-list-item-width);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: none;
  }

  .services-list__item + .services-list__item {
    margin-left: var(--spacing-large);
    padding-left: var(--spacing-large);
    border-left: var(--services-list-border);
  }

  .services-list .service-excerpt {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    align-items: flex-start; /* Reset stretch */
  }
}
</style>
