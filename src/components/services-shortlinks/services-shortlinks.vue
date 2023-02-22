<template>
  <div
    class="services-shortlinks"
  >
    <p class="body">
      {{ $t('go_directly_to') }}
    </p>
    <ul>
      <li
        v-for="(service, index) in services"
        :key="service.slug"
        class="body"
      >
        <template v-if="index !== 0">
          ,
        </template>
        <app-link
          :to="$localeUrl({ name: 'services-slug', params: { slug: service.slug } })"
          class="body"
        >
          {{ service.title }}
        </app-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    services: {
      type: Array,
      required: true,
      validator(services) {
        return services.every(service => typeof service === 'object')
      },
    },
  },
}
</script>

<style>
  .services-shortlinks ul {
    list-style: none;
  }

  .services-shortlinks li {
    display: inline;
  }

  .services-shortlinks a {
    text-decoration: none;
    color: var(--html-blue);
    border-bottom: 1px solid;
  }

  .services-shortlinks a:hover,
  .services-shortlinks a:focus {
    border-bottom: none;
  }
</style>
