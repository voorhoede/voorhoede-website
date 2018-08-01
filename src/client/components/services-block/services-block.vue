<template>
  <ul class="services-block">
    <li
      v-for="service in services"
      :key="service.title"
      class="services-block__service"
    >
      <h3 class="services-block__title h5">{{ service.title }}</h3>
      <h4 class="services-block__sub-title h3">{{ service.subTitle }}</h4>
      <ul class="services-block__characteristics-list">
        <li
          v-for="characteristic in service.characteristics"
          class="services-block__characteristic"
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
    }
  }
}
</script>

<style>
</style>
