<template>
  <ul class="services-block grid">
    <li
      v-for="service in services"
      :key="service.title"
      class="services-block__service"
    >
      <h3 class="services-block__service-title h5">{{ service.title }}</h3>
      <h4 class="services-block__service-sub-title h3">{{ service.subTitle }}</h4>
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
    },
  },
}
</script>

<style>
.services-block__service {
  margin-top: var(--spacing-large);
  padding-bottom: var(--spacing-large);
  border-bottom: 2px solid var(--very-dim);
}

.services-block__service + .services-block__service {
  margin-top: var(--spacing-larger);
}

.services-block__service-title {
  background: var(--brand-yellow);
}

.services-block__service-sub-title {
  margin-top: var(--spacing-large);
}

.services-block__service-characteristics-list {
  list-style-type: disc;
}

.services-block .app-button {
  margin-top: var(--spacing-small);
}
</style>
