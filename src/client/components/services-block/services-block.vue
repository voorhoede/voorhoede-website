<template>
  <ul class="services-block grid">
    <li
      v-for="service in services"
      :key="title"
      class="services-block__service"
    >
      <h3 class="services-block__service-title h5">{{ service.title }}</h3>
      <h4 class="services-block__service-sub-title h3">{{ service.subtitle }}</h4>
      <ul class="services-block__service-characteristics-list">
        <li
          v-for="characteristic in service.characteristics"
          :key="characteristic"
          class="services-block__service-characteristic body"
        >{{ characteristic }}</li>
      </ul>
      <AppButton
        secondary
        label="Learn more"
        :to="service.ctaLink"
      />
    </li>
  </ul>
</template>

<script>
import { AppButton } from '~/components'

export default {
  components: { AppButton },
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
            typeof service.ctaLink === 'string'
        })
      },
    },
  },
}
</script>

<style>
.services-block__service {
  padding-bottom: var(--spacing-large);
  margin-bottom: var(--spacing-larger);
  border-bottom: 2px solid var(--very-dim);
}

.services-block__service-title {
  padding-left: var(--spacing-smaller);
  position: relative;
}

/* Putting the background on the title itself will make it a bit off aligned */
.services-block__service-title::before {
  content: '';
  display: block;
  position: absolute;
  top: -1px;
  right: 0;
  bottom: 2px;
  left: 0;
  background: var(--brand-yellow);
  z-index: -1;
}

.services-block__service-sub-title {
  margin-top: var(--spacing-large);
  margin-bottom: var(--spacing-small);
}

.services-block__service-characteristics-list {
  list-style-type: disc;
  margin-left: var(--spacing-medium);
}

.services-block .app-button {
  margin-top: var(--spacing-small);
  margin-left: var(--spacing-medium);
}

.services-block__service-sub-title::after {
  margin-top: var(--spacing-small);
  content: '';
  display: block;
  width: var(--spacing-medium);
  height: 2px;
  background: var(--html-blue);
}
</style>
