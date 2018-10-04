<template>
  <ul class="services-list">
    <li
      v-for="service in services"
      :key="service.ctaLink"
      class="services-list__item"
    >
      <service-excerpt
        :tagline="service.tagline"
        :title="service.title"
        :summary="service.summary"
        :slug="service.slug"
        :cta="cta"
      />
    </li>
  </ul>
</template>

<script>
import { AppButton, ServiceExcerpt, RichTextBlock, } from '~/components'

export default {
  components: { AppButton, ServiceExcerpt, RichTextBlock, },
  props: {
    services: {
      type: Array,
      required: true,
      validator(services) {
        return services.every(service => service instanceof Object)
      },
    },
    cta: {
      type: String,
      required: true,
    }
  },
}
</script>

<style>
:root {
  --services-list-border: 1px solid var(--very-dim);
  --small-service-spacing: 40px; /* needs to be an even number to get service-list-item to be of equal width */
}

.services-list {
  margin-bottom: var(--spacing-medium);
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
    margin-bottom: var(--spacing-larger);
  }

  .services-list__item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .services-list__item:first-child {
    margin-right: var(--small-service-spacing);
    padding-right: var(--small-service-spacing);
    border-right: var(--services-list-border);
  }

  .services-list__item:last-child {
    padding-left: var(--small-service-spacing);
    margin-left: var(--small-service-spacing);
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
