<template>
  <div>
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
          :label="label"
        />
      </li>
    </ul>
    <rich-text-block class="services-text" :text="text" />      
  </div>
</template>

<script>
import { AppButton, ServiceExcerpt, RichTextBlock, } from '../../components'

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
    text: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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
  --small-services-width: 600px;
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

  .services-text {
    margin: 0 auto;
    text-align: center;
    max-width: var(--small-services-width);
  }
}
</style>
